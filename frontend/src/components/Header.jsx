import { LocateIcon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = ({ setSearchData }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const wrapperRef = useRef(null);

  // 🔍 AUTOCOMPLETE
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
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=6&apiKey=50bd57219a77403ca280de1fae885154`
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

  // ❌ CLOSE DROPDOWN
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

  const selectPlace = (place) => {
    setQuery(place.name);
    setSearchData(place.name);
    setPlaces([]);
  };

  const handleSearch = () => {
    if (!query) return;
    setSearchData(query);
    setPlaces([]);
  };

  const handleNearbyMe = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setQuery("Nearby Hotels");
        setSearchData("Nearby Hotels");
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-4 text-center">

        {/* TITLE */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Find your next stay
        </h1>

        {/* SEARCH BAR */}
        <div
          ref={wrapperRef}
          className="flex items-center bg-white rounded-full shadow-xl px-4 py-3 w-full max-w-4xl mx-auto relative"
        >
          {/* INPUT */}
          <div className="flex-1 px-4 relative">
            <input
              type="text"
              value={query}
              placeholder="Where are you going?"
              className="w-full outline-none text-gray-800 text-lg"
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* DROPDOWN */}
            {places.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-xl z-50 max-h-72 overflow-y-auto border">
                {places.map((place, index) => (
                  <div
                    key={index}
                    onClick={() => selectPlace(place)}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    📍 {place.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* NEARBY */}
          <button
            onClick={handleNearbyMe}
            className="ml-3 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100"
          >
            <LocateIcon size={18} />
            <span className="hidden sm:block text-sm font-medium">
              Nearby
            </span>
          </button>

          {/* SEARCH */}
          <button
            onClick={handleSearch}
            className="ml-3 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
