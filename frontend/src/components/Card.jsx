import axios from "axios";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const Card = ({ searchData }) => {
  const [hotels, setHotels] = useState([]);
  const [imageIndex, setImageIndex] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchData) return;

    setLoading(true);

    axios
      .get(`http://localhost:5000/api/hotels/search?q=${searchData}`)
      .then((res) => {
        setHotels(res.data?.properties || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [searchData]);

  const nextImg = (i, length) => {
    setImageIndex((prev) => ({
      ...prev,
      [i]: ((prev[i] || 0) + 1) % length,
    }));
  };

  const prevImg = (i, length) => {
    setImageIndex((prev) => ({
      ...prev,
      [i]: prev[i] === 0 ? length - 1 : (prev[i] || 0) - 1,
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-8">
        {searchData || "Popular Hotels"}
      </h2>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
              <div className="h-[180px] bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : hotels.length === 0 ? (
        
        /* EMPTY STATE */
        <div className="text-center mt-20">
          <p className="text-xl font-semibold">
            No hotels found 😕
          </p>
          <p className="text-gray-500 mt-2">
            Try searching for another destination
          </p>
        </div>

      ) : (
        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {hotels.map((hotel, i) => {
            const images = hotel.images || [];
            const currentIndex = imageIndex[i] || 0;

            const currentImage =
              images.length > 0
                ? images[currentIndex]?.thumbnail
                : "https://via.placeholder.com/400";

            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-[4/3] bg-gray-100">

                  <img
                    src={currentImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* ARROWS */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImg(i, images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={() => nextImg(i, images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* COUNTER */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
                      {currentIndex + 1}/{images.length}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-1">

                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {hotel.name || "Hotel"}
                    </h3>

                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-rose-500 text-rose-500" />
                      {hotel.overall_rating || "4.0"}
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm truncate">
                    {hotel.type || "Hotel"}
                  </p>

                  <p className="mt-2 font-semibold text-rose-500">
                    ₹{hotel.rate_per_night?.lowest || "2500"}{" "}
                    <span className="text-gray-500 text-sm">/ night</span>
                  </p>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Card;
