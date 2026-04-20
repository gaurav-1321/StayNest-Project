import { LocateIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

const Header = ({ setSearchData }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  // AUTO SUGGESTIONS WHILE TYPING
  useEffect(() => {
    if (query.trim().length < 2) {
      setPlaces([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchPlaces();
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  const fetchPlaces = async () => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=8&apiKey=50bd57219a77403ca280de1fae885154`
      );

      const data = await res.json();

      const placeList = data.features.map((item) => ({
        name: item.properties.formatted,
      }));

      setPlaces(placeList);
    } catch (error) {
      console.log(error);
    }
  };

  // CLICK SUGGESTION
  const selectPlace = (place) => {
    setQuery(place.name);
    setSearchData(place.name);
    setPlaces([]);
  };

  // SEARCH BUTTON
  const handleSearch = () => {
    setSearchData(query);
    setPlaces([]);
  };

  // NEARBY
  const handleNearbyMe = () => {
    navigator.geolocation.getCurrentPosition(() => {
      setQuery("Nearby Hotels");
      setSearchData("Nearby Hotels");
    });
  };
   console.log(query);

  return (
    <div className="flex justify-center mt-10 px-8">
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-3 w-full max-w-5xl relative">

        {/* INPUT */}
        <div className="flex-1 px-4 relative">
          <input
            type="text"
            value={query}
            placeholder="Your Destination!!"
            className="w-full outline-none text-gray-700 text-lg"
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* LIVE SUGGESTIONS */}
          {places.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-xl z-50 max-h-72 overflow-y-auto">
              {places.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectPlace(place)}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {place.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="ml-4 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full"
        >
          <Search size={22} />
        </button>

        {/* NEARBY */}
        <button
          onClick={handleNearbyMe}
          className="flex items-center gap-2 ml-3 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-full"
        >
          <LocateIcon size={18} />
          Nearby Me
        </button>

      </div>
    </div>
  );
};

export default Header;
