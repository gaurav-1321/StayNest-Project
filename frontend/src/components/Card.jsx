import axios from "axios";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Card = ({ title, searchData }) => {
  const [hotels, setHotels] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hotels", {
          params: { city: searchData },
        });

        setHotels(res.data || []);
      } catch (error) {
        console.log("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [searchData]);

  // 👉 Scroll Functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">

      {/* 🔹 Section Title */}
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      {/* 🔹 Scroll Buttons */}
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

      {/* 🔹 Cards Row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {hotels.map((hotel, i) => (
          <div
            key={i}
            className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start cursor-pointer group"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={hotel.image || "/hotel.jpg"}
                alt={hotel.name}
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* ❤️ Wishlist */}
              <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow">
                <Heart size={18} />
              </button>

              {/* ⭐ Rating */}
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm shadow">
                <Star size={14} />
                <span>{hotel.rating || "4.5"}</span>
              </div>
            </div>

            {/* Info */}
            <div className="mt-3 space-y-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {hotel.name || "Beautiful Stay"}
              </h3>

              <p className="text-gray-500 text-sm">
                {hotel.location || searchData}
              </p>

              <p className="text-gray-500 text-sm">
                1–5 nights available
              </p>

              <p className="font-semibold text-gray-900">
                ₹{hotel.price || "2500"}{" "}
                <span className="text-gray-500 font-normal">night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
