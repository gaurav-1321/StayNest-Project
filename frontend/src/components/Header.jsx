import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = ({ setSearchData }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const wrapperRef = useRef(null);

const API_KEY = "50bd57219a77403ca280de1fae885154";

useEffect(() => {
  if (query.trim().length < 2) {
    setPlaces([]);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=6&apiKey=${API_KEY}`
      );

      const data = await res.json();

      const list =
        data.features?.map((item) => ({
          name: item.properties.formatted,
        })) || [];

      setPlaces(list);
    } catch (error) {
      console.log("Error:", error);
      setPlaces([]);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [query]);


  //  CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setPlaces([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 📍 SELECT PLACE
  const selectPlace = (place) => {
    setQuery(place.name);
    setSearchData(place.name);
    setPlaces([]);
  };

  // 🔍 SEARCH BUTTON
  const handleSearch = () => {
    if (!query) return;
    setSearchData(query);
    setPlaces([]);
  };

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full px-4 text-center">
        {/* TITLE */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Find your next stay
        </h1>

        {/* SEARCH BAR */}
        <div
          ref={wrapperRef}
          className="flex items-center bg-white rounded-full shadow-xl px-4 py-3 w-full max-w-3xl mx-auto relative"
        >
          {/* INPUT */}
          <div className="flex-1 px-3 relative">
            <input
              type="text"
              value={query}
              placeholder="Search location..."
              className="w-full outline-none text-gray-800 text-lg"
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* DROPDOWN */}
            {places.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl z-50 max-h-64 overflow-y-auto border">
                {places.map((place, index) => (
                  <div
                    key={index}
                    onClick={() => selectPlace(place)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}

            {/* NO RESULTS */}
            {places.length === 0 && query.length > 2 && (
              <div className="absolute top-12 left-0 w-full bg-white p-2 text-gray-500 rounded-xl shadow">
                No results found
              </div>
            )}
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full"
          >
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
