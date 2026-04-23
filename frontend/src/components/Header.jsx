import { LocateIcon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = ({ setSearchData }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const wrapperRef = useRef(null);

  // AUTO SUGGESTIONS
  useEffect(() => {
    if (query.trim().length < 2) {
      setPlaces([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchPlaces();
    }, 400);

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

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setPlaces([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SELECT PLACE
  const selectPlace = (place) => {
    setQuery(place.name);
    setSearchData(place.name);
    setPlaces([]);
  };

  // SEARCH
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

  return (
    <div className="flex justify-center mt-16 px-4">
      <div
        ref={wrapperRef}
        className="flex items-center backdrop-blur-md bg-white/80 rounded-full shadow-xl px-4 py-3 w-full max-w-5xl relative border border-white/30"
      >
        {/* INPUT */}
        <div className="flex-1 px-4 relative">
          <input
            type="text"
            value={query}
            placeholder="Search destinations..."
            className="w-full outline-none text-gray-800 text-lg bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* DROPDOWN */}
          {places.length > 0 && (
            <div className="absolute top-14 left-0 w-full backdrop-blur-md bg-white/90 shadow-xl rounded-xl z-50 max-h-72 overflow-y-auto border border-white/20">
              
              {places.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectPlace(place)}
                  className="px-4 py-3 hover:bg-black/10 cursor-pointer text-sm text-gray-800"
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
          className="ml-4 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full shadow-md transition"
        >
          <Search size={22} />
        </button>

        {/* NEARBY */}
        <button
          onClick={handleNearbyMe}
          className="flex items-center gap-2 ml-3 bg-rose-400 hover:bg-rose-500 text-white px-5 py-3 rounded-full shadow-md transition"
        >
          <LocateIcon size={18} />
          Nearby
        </button>
      </div>
    </div>
  );
};

export default Header;
