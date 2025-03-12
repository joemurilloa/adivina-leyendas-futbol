// app/page.tsx
'use client';

import AdivinaLeyenda from './components/AdivinaLeyenda';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-violet-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Elementos de balón */}
        <div className="absolute top-20 right-32 w-16 h-16 bg-purple-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-24 w-12 h-12 bg-purple-500 rounded-full opacity-10"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <AdivinaLeyenda />
      </div>
    </main>
  );
}