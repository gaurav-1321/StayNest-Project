import axios from "axios";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Card1 = ({ title, searchData }) => {
  const [hotels, setHotels] = useState([]);
  const scrollRef = useRef();

  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
      console.log("Searched data value", searchData );
        const res = await axios.get(
          "http://localhost:5000/api/hotels/search",
          {
            params: { q: searchData || "India" },
          }
        );

        console.log("HOTELS:", res.data.hotels);
        setHotels(res.data.hotels || []);
      } catch (error) {
        console.log("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [searchData]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:block"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:block"
      >
        <ChevronRight size={20} />
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {hotels.map((hotel, i) => (
          <div
            key={i}
            className="min-w-[260px] max-w-[260px] flex-shrink-0 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={
                  hotel.images?.[0]?.thumbnail ||
                  hotel.images?.[0]?.original_image ||
                  "/hotel.jpg"
                }
                alt={hotel.name}
                className="h-64 w-full object-cover group-hover:scale-105 transition"
              />

              <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow">
                <Heart size={18} />
              </button>

              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm shadow">
                <Star size={14} />
                <span>{hotel.overall_rating || "4.5"}</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {hotel.name || hotel.property_name || "Beautiful Stay"}
              </h3>

              <p className="text-gray-500 text-sm">
                {hotel.location || searchData}
              </p>

              <p className="text-gray-500 text-sm">
                1–5 nights available
              </p>

              <p className="font-semibold text-gray-900">
                ₹{hotel.rate_per_night?.lowest || "2500"}
                <span className="text-gray-500 font-normal"> / night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card1;

