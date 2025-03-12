import React, { useState, useEffect } from 'react';

// Base de datos de jugadores de fútbol legendarios
const footballLegends = [
  {
    id: 1,
    name: "Pelé",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Ganó tres Copas del Mundo",
      "Es considerado uno de los mejores jugadores de todos los tiempos",
      "Jugó la mayor parte de su carrera en el Santos FC",
      "Marcó más de 1000 goles en su carrera"
    ]
  },
  {
    id: 2,
    name: "Diego Maradona",
    clues: [
      "El jugador que estoy pensando es argentino",
      "Es famoso por la 'Mano de Dios'",
      "Ganó el Mundial de 1986",
      "Jugó en el Napoli y lo llevó a ganar su primer Scudetto",
      "Usaba el número 10 en su camiseta"
    ]
  },
  {
    id: 3,
    name: "Johan Cruyff",
    clues: [
      "El jugador que estoy pensando es holandés",
      "Revolucionó el fútbol con un estilo de juego llamado 'fútbol total'",
      "Ganó tres Balones de Oro",
      "Jugó y entrenó al FC Barcelona",
      "Tiene una jugada famosa que lleva su nombre: 'El giro de Cruyff'"
    ]
  },
  {
    id: 4,
    name: "Zinedine Zidane",
    clues: [
      "El jugador que estoy pensando es francés",
      "Ganó la Copa del Mundo en 1998",
      "Es famoso por un cabezazo en la final del Mundial 2006",
      "Jugó en la Juventus y el Real Madrid",
      "Después de retirarse, entrenó al Real Madrid y ganó tres Champions League consecutivas"
    ]
  },
  {
    id: 5,
    name: "Ronaldo Nazário",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Es conocido como 'El Fenómeno'",
      "Ganó dos Copas del Mundo",
      "Jugó en el Barcelona, Inter, Real Madrid y Milan",
      "Sufrió graves lesiones de rodilla que afectaron su carrera"
    ]
  },
  {
    id: 6,
    name: "Lionel Messi",
    clues: [
      "El jugador que estoy pensando es argentino",
      "Ha ganado múltiples Balones de Oro",
      "Jugó la mayor parte de su carrera en el FC Barcelona",
      "Es conocido por su habilidad para regatear y su pie izquierdo",
      "Ganó la Copa del Mundo en 2022"
    ]
  },
  {
    id: 7,
    name: "Cristiano Ronaldo",
    clues: [
      "El jugador que estoy pensando es portugués",
      "Es famoso por su físico y potencia",
      "Ha jugado en el Sporting CP, Manchester United, Real Madrid y Juventus",
      "Ha ganado múltiples Champions League",
      "Es conocido por su celebración gritando 'Siu'"
    ]
  },
  {
    id: 8,
    name: "Franz Beckenbauer",
    clues: [
      "El jugador que estoy pensando es alemán",
      "Es conocido como 'El Kaiser'",
      "Revolucionó la posición de líbero",
      "Ganó la Copa del Mundo como jugador y como entrenador",
      "Pasó la mayor parte de su carrera en el Bayern Múnich"
    ]
  },
  {
    id: 9,
    name: "Ronaldinho",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Es conocido por su sonrisa y juego alegre",
      "Ganó la Copa del Mundo en 2002",
      "Jugó en el PSG, Barcelona y Milan",
      "Ganó el Balón de Oro en 2005"
    ]
  },
  {
    id: 10,
    name: "Michel Platini",
    clues: [
      "El jugador que estoy pensando es francés",
      "Ganó tres Balones de Oro consecutivos",
      "Jugó principalmente en la Juventus",
      "Fue presidente de la UEFA",
      "Fue campeón de Europa con Francia en 1984"
    ]
  },
  {
    id: 11,
    name: "Alfredo Di Stéfano",
    clues: [
      "El jugador que estoy pensando jugó para Argentina y España",
      "Es una leyenda del Real Madrid",
      "Ganó 5 Copas de Europa consecutivas",
      "Nunca jugó un Mundial",
      "Era conocido como 'La Saeta Rubia'"
    ]
  },
  {
    id: 12,
    name: "Ferenc Puskás",
    clues: [
      "El jugador que estoy pensando es húngaro",
      "Fue parte del 'Equipo de Oro' de Hungría",
      "Más tarde jugó para el Real Madrid",
      "La FIFA nombró un premio de gol en su honor",
      "Era conocido por su potente pie izquierdo"
    ]
  },
  {
    id: 13,
    name: "Paolo Maldini",
    clues: [
      "El jugador que estoy pensando es italiano",
      "Jugó toda su carrera en el AC Milan",
      "Es considerado uno de los mejores defensores de todos los tiempos",
      "Su padre también fue un legendario defensor",
      "Jugó más de 1000 partidos profesionales"
    ]
  },
  {
    id: 14,
    name: "Thierry Henry",
    clues: [
      "El jugador que estoy pensando es francés",
      "Es el máximo goleador histórico del Arsenal",
      "Ganó el Mundial en 1998 y la Eurocopa en 2000",
      "Formó parte de 'Los Invencibles' del Arsenal",
      "Después de retirarse, se convirtió en comentarista deportivo"
    ]
  },
  {
    id: 15,
    name: "Lev Yashin",
    clues: [
      "El jugador que estoy pensando es ruso (soviético)",
      "Es el único portero en ganar el Balón de Oro",
      "Era conocido como 'La Araña Negra'",
      "Jugó toda su carrera en el Dinamo de Moscú",
      "Es considerado el mejor portero de la historia"
    ]
  },
  {
    id: 16,
    name: "Neymar Jr",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Fichó por el Barcelona en 2013",
      "Posteriormente se convirtió en el fichaje más caro de la historia",
      "Formó parte del tridente 'MSN'",
      "Jugó en Santos, Barcelona y PSG"
    ]
  },
  {
    id: 17,
    name: "Andrés Iniesta",
    clues: [
      "El jugador que estoy pensando es español",
      "Marcó el gol ganador en la final del Mundial 2010",
      "Formó una legendaria pareja de centrocampistas en el Barcelona",
      "Es conocido por su visión de juego y control del balón",
      "Después del Barcelona, se fue a jugar a Japón"
    ]
  },
  {
    id: 18,
    name: "Roberto Baggio",
    clues: [
      "El jugador que estoy pensando es italiano",
      "Es conocido como 'El Divino'",
      "Falló un penalti decisivo en la final del Mundial de 1994",
      "Ganó el Balón de Oro en 1993",
      "Es conocido por su coleta y por ser budista"
    ]
  },
  {
    id: 19,
    name: "George Best",
    clues: [
      "El jugador que estoy pensando es norirlandés",
      "Jugó principalmente en el Manchester United",
      "Era conocido tanto por su talento como por su estilo de vida",
      "Ganó la Copa de Europa en 1968",
      "Era llamado 'El quinto Beatle' por su popularidad"
    ]
  },
  {
    id: 20,
    name: "Garrincha",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Tenía las piernas arqueadas debido a una deformidad de nacimiento",
      "Ganó dos Copas del Mundo con Brasil",
      "Era conocido por sus regates y fútbol alegre",
      "Jugó la mayor parte de su carrera en el Botafogo"
    ]
  },
  {
    id: 21,
    name: "Xavi Hernández",
    clues: [
      "El jugador que estoy pensando es español",
      "Fue un maestro del pase y el control del balón",
      "Formó una legendaria dupla con Iniesta en el Barcelona",
      "Ganó el Mundial en 2010 y dos Eurocopas",
      "Actualmente es entrenador después de jugar sus últimos años en Qatar"
    ]
  },
  {
    id: 22,
    name: "Gerd Müller",
    clues: [
      "El jugador que estoy pensando es alemán",
      "Conocido como 'El Bombardero'",
      "Durante mucho tiempo tuvo el récord de goles en un año natural",
      "Ganó la Copa del Mundo en 1974",
      "Es el máximo goleador histórico del Bayern Múnich"
    ]
  },
  {
    id: 23,
    name: "Kylian Mbappé",
    clues: [
      "El jugador que estoy pensando es francés",
      "Ganó el Mundial siendo muy joven en 2018",
      "Jugó en el Monaco y PSG antes de dar el salto a otro gigante europeo",
      "Es conocido por su increíble velocidad",
      "Es considerado el heredero de Messi y Cristiano"
    ]
  },
  {
    id: 24,
    name: "Kaká",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Ganó el Balón de Oro en 2007",
      "Jugó en el São Paulo, Milan y Real Madrid",
      "Era conocido por sus carreras elegantes con el balón",
      "Es muy religioso y mostraba mensajes cristianos en sus camisetas"
    ]
  },
  {
    id: 25,
    name: "Zlatan Ibrahimović",
    clues: [
      "El jugador que estoy pensando es sueco",
      "Es famoso por su personalidad extravagante y sus declaraciones",
      "Ha jugado en múltiples grandes clubes como Ajax, Juventus, Barcelona, PSG, Milan y Manchester United",
      "Es conocido por sus goles acrobáticos",
      "Se refiere a sí mismo en tercera persona"
    ]
  },
  {
    id: 26,
    name: "David Beckham",
    clues: [
      "El jugador que estoy pensando es inglés",
      "Es famoso por sus pases largos y tiros libres",
      "Jugó en el Manchester United y Real Madrid, entre otros",
      "Se convirtió en una celebridad global y un icono de la moda",
      "Actualmente es propietario del Inter Miami"
    ]
  },
  {
    id: 27,
    name: "Didier Drogba",
    clues: [
      "El jugador que estoy pensando es marfileño",
      "Fue un delantero potente y completo",
      "Es una leyenda del Chelsea FC",
      "Anotó el gol del empate y el penalti decisivo en la final de la Champions League 2012",
      "Además de su carrera futbolística, es conocido por su labor humanitaria"
    ]
  },
  {
    id: 28,
    name: "Iker Casillas",
    clues: [
      "El jugador que estoy pensando es español",
      "Es considerado uno de los mejores porteros de la historia",
      "Capitán de la selección española en los títulos de 2008, 2010 y 2012",
      "Pasó la mayor parte de su carrera en el Real Madrid",
      "Es conocido como 'San Iker' por sus increíbles paradas"
    ]
  },
  {
    id: 29,
    name: "Andrea Pirlo",
    clues: [
      "El jugador que estoy pensando es italiano",
      "Era conocido como 'El Arquitecto' o 'El Maestro'",
      "Famoso por su visión de juego y pases precisos",
      "Ganó el Mundial con Italia en 2006",
      "Jugó en el Milan y la Juventus, entre otros equipos"
    ]
  },
  {
    id: 30,
    name: "Samuel Eto'o",
    clues: [
      "El jugador que estoy pensando es camerunés",
      "Ganó la Champions League con el Barcelona y el Inter en años consecutivos",
      "Es el máximo goleador histórico de la selección de Camerún",
      "Fue un delantero veloz y letal",
      "Actualmente es presidente de la federación de fútbol de su país"
    ]
  },
  {
    id: 31,
    name: "Raúl González",
    clues: [
      "El jugador que estoy pensando es español",
      "Fue capitán y leyenda del Real Madrid",
      "Durante mucho tiempo fue el máximo goleador histórico del Real Madrid y de la Champions League",
      "Su celebración característica era besarse el anillo",
      "Terminó su carrera en el Schalke 04 y el Al-Sadd"
    ]
  },
  {
    id: 32,
    name: "Rivaldo",
    clues: [
      "El jugador que estoy pensando es brasileño",
      "Ganó el Balón de Oro en 1999",
      "Formó parte del tridente 'Las Tres R' con Ronaldo y Ronaldinho",
      "Ganó el Mundial de 2002 con Brasil",
      "Es famoso por un espectacular gol de chilena con el Barcelona"
    ]
  },
  {
    id: 33,
    name: "Paul Scholes",
    clues: [
      "El jugador que estoy pensando es inglés",
      "Jugó toda su carrera en el Manchester United",
      "Era conocido por su excelente técnica y visión de juego",
      "Ganador de múltiples Premier Leagues y Champions League",
      "Era pelirrojo y muy admirado por Xavi e Iniesta"
    ]
  },
  {
    id: 34,
    name: "Alessandro Del Piero",
    clues: [
      "El jugador que estoy pensando es italiano",
      "Es una leyenda de la Juventus",
      "Ganó el Mundial con Italia en 2006",
      "Era conocido como 'Il Fenomeno Vero' o 'Pinturicchio'",
      "Famoso por su 'tiro a la Del Piero', curvando el balón al ángulo lejano"
    ]
  },
  {
    id: 35,
    name: "Luis Figo",
    clues: [
      "El jugador que estoy pensando es portugués",
      "Ganó el Balón de Oro en 2000",
      "Jugó tanto para el Barcelona como para el Real Madrid",
      "Su traspaso entre estos equipos fue muy polémico",
      "Era un extremo habilidoso conocido por sus regates"
    ]
  },
  {
    id: 36,
    name: "Oliver Kahn",
    clues: [
      "El jugador que estoy pensando es alemán",
      "Era un portero conocido por su carácter intenso",
      "Jugó en el Bayern Munich durante la mayor parte de su carrera",
      "Lo apodaban 'El Titán' o 'King Kahn'",
      "Fue elegido mejor jugador del Mundial 2002 a pesar de no ganarlo"
    ]
  },
  {
    id: 37,
    name: "Luis Suárez",
    clues: [
      "El jugador que estoy pensando es uruguayo",
      "Es conocido por su capacidad goleadora y su intensidad",
      "Formó parte del tridente 'MSN' en el Barcelona",
      "Ha jugado en Ajax, Liverpool, Barcelona y Atlético de Madrid",
      "Ha sido objeto de controversias por algunos incidentes en el campo"
    ]
  },
  {
    id: 38,
    name: "Sergio Ramos",
    clues: [
      "El jugador que estoy pensando es español",
      "Es un defensor con un notable olfato goleador",
      "Capitán del Real Madrid durante muchos años",
      "Marcó un gol crucial en el minuto 93 de una final de Champions",
      "Ha ganado un Mundial y dos Eurocopas con España"
    ]
  },
  {
    id: 39,
    name: "Javier Zanetti",
    clues: [
      "El jugador que estoy pensando es argentino",
      "Jugó más de 800 partidos con el Inter de Milán",
      "Era conocido por su consistencia y profesionalismo",
      "Podía jugar como lateral derecho o como centrocampista",
      "Era apodado 'El Tractor' o 'Pupi'"
    ]
  },
  {
    id: 40,
    name: "Marco van Basten",
    clues: [
      "El jugador que estoy pensando es holandés",
      "Ganó tres Balones de Oro",
      "Su carrera se vio truncada por lesiones",
      "Es recordado por un espectacular gol de volea en la final de la Eurocopa de 1988",
      "Jugó en el Ajax y en el AC Milan"
    ]
  }
];

const AdivinaLeyenda = () => {
  const [currentLegend, setCurrentLegend] = useState(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost', 'master'
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showClue, setShowClue] = useState(false);
  const [usedLegends, setUsedLegends] = useState([]);

  // Elegir un jugador aleatorio al inicio
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Filtrar jugadores que no han sido usados
    const availableLegends = footballLegends.filter(legend => 
      !usedLegends.includes(legend.id)
    );
    
    // Si ya se usaron todos, reiniciar la lista
    if (availableLegends.length === 0) {
      setUsedLegends([]);
      startNewGame();
      return;
    }
    
    // Seleccionar un jugador aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableLegends.length);
    const legend = availableLegends[randomIndex];
    
    // Añadir a la lista de usados
    setUsedLegends([...usedLegends, legend.id]);
    
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
    setTimeout(() => {
      setMessage('¡Nueva leyenda! Aquí tienes la primera pista.');
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  const handleGuess = () => {
    if (!guess.trim()) return;
    
    // Normalizar textos: eliminar acentos, convertir a minúsculas y quitar espacios extra
    const normalizeText = (text) => {
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
        setMessage('¡VENCISTE AL GENIO DEL FÚTBOL! ERES UNA LEYENDA. Has adivinado todos los jugadores.');
      } else {
        setGameState('won');
        setMessage(`¡Correcto! Has adivinado que era ${currentLegend.name}. Necesitaste ${clueIndex + 1} pistas.`);
        
        // Bonificación: Cada 5 aciertos consecutivos da una vida extra
        if (newScore % 5 === 0) {
          setLives(lives + 1);
          setTimeout(() => {
            setMessage(`¡Has conseguido una vida extra por acertar 5 jugadores! Ahora tienes ${lives + 1} vidas.`);
          }, 2500);
        }
      }
    } else {
      // Error
      setLives(lives - 1);
      setMessage(`Incorrecto. Te quedan ${lives - 1} vidas.`);
      setTimeout(() => setMessage(''), 2000);
      
      if (lives - 1 === 0) {
        setGameState('lost');
        setMessage(`¡Has perdido! La leyenda era ${currentLegend.name}.`);
      }
    }
    
    setGuess('');
  };

  const showNextClue = () => {
    if (clueIndex < currentLegend.clues.length - 1) {
      // Penalización por pistas: cada 2 pistas consecutivas pierde 1 vida
      if (clueIndex % 2 === 1) {
        setLives(lives - 1);
        if (lives - 1 === 0) {
          setGameState('lost');
          setMessage(`¡Has perdido! La leyenda era ${currentLegend.name}.`);
          return;
        }
        setMessage('Has perdido una vida por pedir demasiadas pistas. Te quedan ' + (lives - 1) + ' vidas.');
      } else {
        setMessage('¡Nueva pista revelada!');
      }
      
      setClueIndex(clueIndex + 1);
      setShowClue(true);
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('¡No hay más pistas disponibles!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="text-3xl font-bold mb-2">Adivina la Leyenda</h1>
        <p className="text-xl">El genio del fútbol está pensando en una leyenda...</p>
      </header>

      <div className="main-card">
        {gameState === 'playing' && (
          <div>
            <div className="game-header">
              <div className="lives-display">
                Vidas: {Array(lives).fill('❤️').join(' ')}
              </div>
              <div className="score-display">
                Puntuación: {score}
              </div>
            </div>
            
            <div className="clue-container">
              {showClue && (
                <p className="clue-text">
                  {currentLegend?.clues[clueIndex]}
                </p>
              )}
            </div>
            
            <div>
              <div className="input-container">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  placeholder="¿Quién es esta leyenda?"
                  className="guess-input"
                />
                <button
                  onClick={handleGuess}
                  className="guess-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </button>
              </div>
              
              <button
                onClick={showNextClue}
                className="clue-button"
              >
                Más Pistas
              </button>
              
              {message && (
                <div className="message">
                  {message}
                </div>
              )}
            </div>
          </div>
        )}

        {(gameState === 'won' || gameState === 'lost' || gameState === 'master') && (
          <div className="result-container">
            <div className="result-card">
              <p className="result-title">
                {gameState === 'won' ? '¡Felicidades!' : gameState === 'master' ? '¡LEYENDA!' : '¡Has perdido!'}
              </p>
              <p className="mb-4">{message}</p>
              <p className="font-medium">Acertaste {score} futbolistas</p>
            </div>
            
            <button
              onClick={startNewGame}
              className={`play-again-button ${gameState === 'master' ? 'master-button' : ''}`}
            >
              {gameState === 'master' ? '¡Reiniciar Como Campeón!' : 'Jugar de Nuevo'}
            </button>
          </div>
        )}
      </div>

      <footer>
        <p>By Joe</p>
        <p className="mt-1">¡Demuestra cuánto sabes de las leyendas del fútbol!</p>
      </footer>
    </div>
  );
};

export default AdivinaLeyenda;