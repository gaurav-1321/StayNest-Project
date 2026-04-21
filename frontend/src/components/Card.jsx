import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const Card = ({ searchData, title }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/hotels/search?q=${searchData}`
        );

        setHotels(res.data.properties || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotels();
  }, [searchData]);

  const fallbackImage =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

  return (
    /* almost full page width like Airbnb */
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        {title}
      </h2>

      <div
        className="flex gap-4 overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {hotels.slice(0, 8).map((hotel, index) => (
          <div
            key={index}
            className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] flex-shrink-0 hover:scale-105 duration-300 cursor-pointer"
          >
            <img
              src={
                hotel.images?.[0]?.thumbnail ||
                hotel.images?.[0]?.original_image ||
                hotel.images?.[1]?.thumbnail ||
                hotel.images?.[1]?.original_image ||
                fallbackImage
              }
              alt={hotel.name}
              className="w-full h-60 object-cover rounded-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />

            <div className="mt-3">
              <div className="flex justify-between gap-2">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {hotel.name}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="black" />
                  {hotel.overall_rating || "4.0"}
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                {hotel.type || "Hotel"}
              </p>

              <p className="mt-1 font-medium text-sm">
                ₹{hotel.rate_per_night?.lowest || "2500"} / night
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Card;
