import React, { useState , lazy} from 'react';

function Inyarwanda() {
  const movies = [
    {
      name: "Hurts Hurder",
      src: "https://thumb.canalplus.pro/http/unsafe/1472x832/filters:quality(100)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/120185490"
    },
    {
      name: "Shuwa Dilu",
      src: "https://thumb.canalplus.pro/http/unsafe/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/115128018"
    },
    {
      name: "Kaliza wa Kalisa",
      src: "https://thumb.canalplus.pro/http/unsafe/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/116292627"
    },
    {
      name: "Umugabo wa mama",
      src: "https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/media.prod.hawc.canal.aws.io-cplus.net/37ed79ebef3a5f7fafe0870f7202b9f5.jpg"
    },
    {
      name: "Mucamo",
      src: "https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/canalplus-cdn.canal-plus.io/p1/unit/29797048/canal-ouah_50680/STD169/myCANAL_16x9_MEA_1920x1080.jpg801-ZVjT"
    },
    {
      name: "Ishusho ya Papa",
      src: "https://thumb.canalplus.pro/http/unsafe/338x190/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/115308226"
    }
  ];

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="px-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-2xl">Rwandan Films</h1>
        <div className="flex gap-4 text-xl cursor-pointer">
          <i className="fa-solid fa-arrow-left hero-icons"></i>
          <i className="fa-solid fa-arrow-right hero-icons"></i>
        </div>
      </div>
      <br />

      {/* Movie list */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[60vw] sm:w-[15rem] md:w-[23rem] aspect-video rounded-lg overflow-hidden relative cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={movie.src}
              alt={movie.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading='lazy'
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedMovie && (
        <div className="flex items-center justify-center flex-col fixed top-0 left-0 w-full h-full bg-black/80 z-50">
          <div className="w-[94%] md:w-[60%] h-[28rem] flex flex-col items-center justify-center">
            <div className="w-full h-[25rem] rounded-lg overflow-hidden relative">
              <img
                src={selectedMovie.src}
                alt={selectedMovie.name}
                className="w-full h-full rounded-lg object-cover"
                loading='lazy'
              />

              {/* bottom shadow overlay */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/95 to-transparent"></div>

              {/* text on top of shadow */}
              <p className="absolute bottom-7 left-10 font-bold text-3xl text-white">
                {selectedMovie.name}
              </p>

              <i
                title="Close"
                className="fa-solid fa-xmark absolute top-3 right-5 cursor-pointer text-white text-2xl"
                onClick={() => setSelectedMovie(null)}
              ></i>
            </div>

            {/* Bottom Section */}
            <div className="bg-[#121212] flex flex-wrap items-center justify-center w-full h-[8rem] gap-3.5 relative">
              <div>
                <button
                  className="playBtn text-black bg-white rounded-[6px] font-bold flex items-center gap-2 px-4 py-2 cursor-not-allowed"
                >
                  ▶ Watch Now
                </button>
              </div>
              <div className="text-white p-4 rounded-lg text-left shadow-lg">
                    Unavailable in your country — licensing issues are to blame. 😕
              </div>
                <p className="text-white absolute bottom-2 right-3">Country : Rwanda</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inyarwanda;
