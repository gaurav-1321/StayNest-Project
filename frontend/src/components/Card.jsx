import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const Card = ({ searchData }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (!searchData) return;

    axios
      .get(`http://localhost:5000/api/hotels/search?q=${searchData}`)
      .then((res) => {
        setHotels(res.data.properties || []);
      })
      .catch((err) => console.log(err));
  }, [searchData]);

  return (
    <div className="px-8 py-10">
      <h2 className="text-3xl font-semibold mb-8">
        {searchData || "Popular Hotels"}
      </h2>

      <div className="grid grid-cols-4 gap-7">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="hover:scale-105 duration-300 cursor-pointer"
          >
            <img
              src={
                hotel.images?.[0]?.thumbnail ||
                "https://via.placeholder.com/400"
              }
              alt={hotel.name}
              className="w-full h-72 object-cover rounded-2xl"
            />

            <div className="mt-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{hotel.name}</h3>

                <div className="flex gap-1 items-center">
                  <Star size={14} fill="black" />
                  {hotel.overall_rating || "4.0"}
                </div>
              </div>

              <p className="text-gray-500 text-sm">{hotel.type}</p>

              <p className="mt-2 font-medium">
                ₹{hotel.rate_per_night?.lowest || "2500"} / night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
