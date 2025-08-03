import React from 'react';

const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated beams */}
      <div className="absolute inset-0">
        {/* Beam 1 */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent transform -skew-x-12 animate-pulse"></div>
        
        {/* Beam 2 */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent transform skew-x-12 animate-pulse delay-300"></div>
        
        {/* Beam 3 */}
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent transform -skew-x-6 animate-pulse delay-700"></div>
        
        {/* Beam 4 */}
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/25 to-transparent transform skew-x-6 animate-pulse delay-1000"></div>
        
        {/* Moving beam effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-px h-32 bg-gradient-to-b from-purple-400 to-transparent opacity-60 animate-beam-1"></div>
          <div className="absolute w-px h-24 bg-gradient-to-b from-cyan-400 to-transparent opacity-70 animate-beam-2"></div>
          <div className="absolute w-px h-40 bg-gradient-to-b from-blue-400 to-transparent opacity-50 animate-beam-3"></div>
        </div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-300"></div>
    </div>
  );
};

export default BackgroundBeams;