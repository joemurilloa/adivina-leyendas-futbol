// app/components/AdivinaLeyenda.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Check, Heart, Trophy, RefreshCw } from 'lucide-react';
import { footballLegends, FootballLegend } from '../data/footballLegends';

const AdivinaLeyenda: React.FC = () => {
  const [currentLegend, setCurrentLegend] = useState<FootballLegend | null>(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'master'>('playing');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showClue, setShowClue] = useState(false);
  const [usedLegends, setUsedLegends] = useState<number[]>([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageClass, setMessageClass] = useState('');
  
  // Para depuración
  useEffect(() => {
    console.log("Base de datos de jugadores:", footballLegends.length, "jugadores");
    console.log("Jugadores usados:", usedLegends);
    if (currentLegend) {
      console.log("Jugador actual:", currentLegend.name);
    }
  }, [currentLegend, usedLegends]);

  // Elegir un jugador aleatorio al inicio
  useEffect(() => {
    startNewGame();
  }, []);

  const showMessage = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(msg);
    setMessageVisible(true);
    
    switch(type) {
      case 'success':
        setMessageClass('bg-green-900 text-green-200 border-green-700');
        break;
      case 'error':
        setMessageClass('bg-red-900 text-red-200 border-red-700');
        break;
      default:
        setMessageClass('bg-purple-900 text-purple-200 border-purple-700');
    }
    
    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);
  };

  const startNewGame = () => {
    // Filtrar jugadores que no han sido usados
    const availableLegends = footballLegends.filter(legend => 
      !usedLegends.includes(legend.id)
    );
    
    console.log("Leyendas disponibles:", availableLegends.length);
    
    // Si ya se usaron todos, reiniciar la lista
    if (availableLegends.length === 0) {
      console.log("Reiniciando lista de jugadores usados");
      setUsedLegends([]);
      const randomLegend = footballLegends[Math.floor(Math.random() * footballLegends.length)];
      setUsedLegends([randomLegend.id]);
      setupLegend(randomLegend);
      return;
    }
    
    // Seleccionar un jugador aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableLegends.length);
    const legend = availableLegends[randomIndex];
    
    console.log("Seleccionando nuevo jugador:", legend.name);
    
    // Añadir a la lista de usados
    setUsedLegends(prev => [...prev, legend.id]);
    setupLegend(legend);
  };

  const setupLegend = (legend: FootballLegend) => {
    // Crear una copia de las pistas y desordenarlas
    const shuffledClues = [...legend.clues];
    for (let i = shuffledClues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledClues[i], shuffledClues[j]] = [shuffledClues[j], shuffledClues[i]];
    }
    
    // Guardar la leyenda con las pistas desordenadas
    setCurrentLegend({...legend, clues: shuffledClues});
    setClueIndex(0);
    setLives(3);
    setGameState('playing');
    setMessage('');
    setGuess('');
    setShowClue(true);
    
    // Si perdió reinicia la puntuación
    if (gameState === 'lost') {
      setScore(0);
      setUsedLegends([legend.id]); // Reiniciar también la lista de usados
    }
    
    // Mostrar un mensaje con la primera pista
    showMessage('¡Nueva leyenda! Aquí tienes la primera pista.', 'info');
  };

  const handleGuess = () => {
    if (!guess.trim() || !currentLegend) return;
    
    // Normalizar textos: eliminar acentos, convertir a minúsculas y quitar espacios extra
    const normalizeText = (text: string) => {
      return text.toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, " ");
    };
    
    const normalizedGuess = normalizeText(guess);
    const normalizedLegendName = normalizeText(currentLegend.name);
    const legendNameParts = normalizedLegendName.split(' ');
    
    // Comprobar si la respuesta contiene el apellido o si es el nombre completo
    const isCorrect = normalizedGuess === normalizedLegendName || 
                      legendNameParts.some(part => part.length > 3 && normalizedGuess === part) ||
                      (normalizedLegendName.includes(normalizedGuess) && normalizedGuess.length > 3);
    
    if (isCorrect) {
      // Acierto
      const newScore = score + 1;
      setScore(newScore);
      
      // Comprobar si ha vencido al genio (adivinado todos los jugadores)
      if (newScore >= footballLegends.length) {
        setGameState('master');
        showMessage('¡VENCISTE AL GENIO DEL FÚTBOL! ERES UNA LEYENDA. Has adivinado todos los jugadores.', 'success');
      } else {
        setGameState('won');
        showMessage(`¡Correcto! Has adivinado que era ${currentLegend.name}. Necesitaste ${clueIndex + 1} pistas.`, 'success');
        
        // Bonificación: Cada 5 aciertos consecutivos da una vida extra
        if (newScore % 5 === 0) {
          setLives(prev => prev + 1);
          setTimeout(() => {
            showMessage(`¡Has conseguido una vida extra por acertar 5 jugadores! Ahora tienes ${lives + 1} vidas.`, 'success');
          }, 2500);
        }
      }
    } else {
      // Error
      setLives(prev => prev - 1);
      
      if (lives - 1 === 0) {
        setGameState('lost');
        showMessage(`¡Has perdido! La leyenda era ${currentLegend.name}.`, 'error');
      } else {
        showMessage(`Incorrecto. Te quedan ${lives - 1} vidas.`, 'error');
      }
    }
    
    setGuess('');
  };

  const showNextClue = () => {
    if (!currentLegend) return;
    
    if (clueIndex < currentLegend.clues.length - 1) {
      // Penalización por pistas: cada 2 pistas consecutivas pierde 1 vida
      if (clueIndex % 2 === 1) {
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives === 0) {
          setGameState('lost');
          showMessage(`¡Has perdido! La leyenda era ${currentLegend.name}.`, 'error');
          return;
        }
        
        showMessage(`Has perdido una vida por pedir demasiadas pistas. Te quedan ${newLives} vidas.`, 'error');
      } else {
        showMessage('¡Nueva pista revelada!', 'info');
      }
      
      setClueIndex(prev => prev + 1);
      setShowClue(true);
    } else {
      showMessage('¡No hay más pistas disponibles!', 'info');
    }
  };

  if (!currentLegend) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4">
      <header className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
          Adivina la Leyenda
        </h1>
        <p className="text-xl text-purple-200/90">El genio del fútbol está pensando en una leyenda...</p>
      </header>

      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-900/50 p-6 mb-8">
        {gameState === 'playing' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-1 text-red-500">
                {[...Array(lives)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-purple-100 px-4 py-1 rounded-full text-sm font-medium flex items-center border border-purple-700/50">
                <Trophy className="w-4 h-4 mr-1" /> 
                <span>Puntuación: {score}</span>
              </div>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 mb-6 min-h-24 flex items-center justify-center shadow-inner border border-purple-800/30">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-50"></div>
              {showClue && (
                <p className="text-center font-medium text-purple-200 text-lg">
                  {currentLegend.clues[clueIndex]}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  placeholder="¿Quién es esta leyenda?"
                  className="flex-grow px-4 py-3 bg-gray-800 border-2 border-purple-900/50 rounded-l-lg focus:outline-none focus:border-purple-500 transition-colors text-purple-100 placeholder-gray-500"
                />
                <button
                  onClick={handleGuess}
                  className="bg-gradient-to-r from-green-800 to-emerald-900 text-green-100 px-5 py-3 rounded-r-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-md flex items-center justify-center border border-green-900/50"
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={showNextClue}
                className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 text-purple-100 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all shadow-md font-medium border border-purple-700/50"
              >
                Más Pistas
              </button>
            </div>
          </div>
        )}

        {(gameState === 'won' || gameState === 'lost' || gameState === 'master') && (
          <div className="text-center space-y-6">
            <div className={`rounded-xl p-6 ${
              gameState === 'won' ? 'bg-gradient-to-br from-green-900 to-green-950 border border-green-800/50' : 
              gameState === 'master' ? 'bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-800/50' : 
              'bg-gradient-to-br from-red-900 to-red-950 border border-red-800/50'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                gameState === 'won' ? 'bg-green-800' : 
                gameState === 'master' ? 'bg-amber-800' : 
                'bg-red-800'
              }`}>
                {gameState === 'won' && <Check className="w-8 h-8 text-green-200" />}
                {gameState === 'master' && <Trophy className="w-8 h-8 text-amber-200" />}
                {gameState === 'lost' && <span className="text-2xl text-red-200">✗</span>}
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${
                gameState === 'won' ? 'text-green-200' : 
                gameState === 'master' ? 'text-amber-200' : 
                'text-red-200'
              }`}>
                {gameState === 'won' ? '¡Felicidades!' : 
                 gameState === 'master' ? '¡LEYENDA!' : 
                 '¡Has perdido!'}
              </h3>
              
              <p className="mb-4 text-gray-300">{message}</p>
              <p className="font-medium text-gray-300">Acertaste {score} futbolistas</p>
            </div>
            
            <button
              onClick={startNewGame}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all shadow-md flex items-center justify-center space-x-2 ${
                gameState === 'master' 
                  ? 'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 border border-amber-700/50' 
                  : 'bg-gradient-to-r from-purple-700 to-indigo-900 hover:from-purple-600 hover:to-indigo-800 border border-purple-700/50'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              <span>
                {gameState === 'master' ? '¡Reiniciar Como Campeón!' : 'Jugar de Nuevo'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Mensaje emergente reposicionado para que no estorbe */}
      {messageVisible && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg border ${messageClass} shadow-lg z-50 animate-fadeIn max-w-md text-center`}>
          {message}
        </div>
      )}

      <footer className="text-center text-sm text-purple-300/80 mb-6">
        <p>Desarrollado por Joe Murillo - 2025</p>
        <p className="mt-1">¡Demuestra cuánto sabes de las leyendas del fútbol!</p>
      </footer>
    </div>
  );
};

export default AdivinaLeyenda;