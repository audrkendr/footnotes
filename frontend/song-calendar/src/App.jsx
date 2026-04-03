import React, { useState, useEffect } from 'react';

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonthIndex = new Date().getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    // Fetch track data from the backend
    fetch('http://127.0.0.1:8000/top-tiles')
      .then(res => {
        if (!res.ok) throw new Error('Backend failed to respond');
        return res.json();
      })
      .then(data => {
        setTiles(data);
        setLoading(false);
      })  
      .catch(err => {
      console.error("DETAILED ERROR:", err);
      // Stop loading so we can see the error header
      setLoading(false); 
    });
}, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Tuning your results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 footprint-cursor">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black tracking-tighter">FOOT NOTES 2026</h1>
        <p className="text-gray-400 mt-2">The path of your listening each month, shown by your top tracks</p>
      </header>

      {/* Grid Container*/}
      <div className="mosaic-grid">
        {months.map((month, index) => {
          // check about this month
          const isPastOrCurrent = index <= currentMonthIndex;
          const track = tiles[index];

          //  handle upcoming months (no track data)
          if (!isPastOrCurrent) {
            // colorful title cards for upcoming months
            const gradients = [
              "from-purple-600 to-blue-500", 
              "from-blue-500 to-teal-400", 
              "from-teal-400 to-emerald-500", 
              "from-emerald-500 to-yellow-400", 
              "from-orange-500 to-red-500", 
              "from-pink-500 to-rose-500"
            ];
            
            // rotated colors
            const gradientClass = gradients[index % gradients.length];

            return (
              <div 
                key={month} 
                className={`upcoming-card bg-gradient-to-br group ${gradientClass}`}
              >
                <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] drop-shadow-md">
                  {month}
                </span>
                <div className="h-[1px] w-8 bg-white/30 mt-2 group-hover:w-12 transition-all"></div>
              </div>
            );
          }

          // handle past/current months with track data
          return (
            <a 
              key={month} 
              href={track.external_url || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group rounded-lg overflow-hidden bg-black shadow-2xl transition-all hover:scale-105 hover:ring-2 hover:ring-green-500"
            >
              {/* The Songs' Cover Art */}
              <img 
                src={track.album_art} 
                alt={track.track_name}
                className="w-full aspect-square object-cover opacity-90 group-hover:opacity-60 transition-all duration-300"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="play-button">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Month Label */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/20 to-transparent">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-1">
                  {month}
                </h3>
                <p className="font-bold truncate text-sm leading-tight text-white">
                  {track.track_name}
                </p>
                <p className="text-[11px] text-gray-300 truncate font-medium">
                  {track.artist_name}
                </p>
              </div>
            </a>
          );

        })}
      </div>
    </div>
  );
};

export default App;