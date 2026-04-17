import { BedDouble, CalendarDays, Search, Users } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-3 w-full max-w-5xl">

        {/* Destination */}
        <div className="flex-1 px-4">
          <input
            type="text"
            placeholder="Your Destination!!"
            className="w-full outline-none text-gray-700 text-lg"
          />
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Dates */}
        <div className="flex items-center gap-2 px-4 text-gray-600 cursor-pointer hover:text-black">
          <CalendarDays size={18} />
          <span>Check-in → Check-out</span>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Guests */}
        <div className="flex items-center gap-2 px-4 text-gray-600 cursor-pointer hover:text-black">
          <Users size={18} />
          <span>2</span>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Rooms */}
        <div className="flex items-center gap-2 px-4 text-gray-600 cursor-pointer hover:text-black">
          <BedDouble size={18} />
          <span>1</span>
        </div>

        {/* Search Button */}
        <button className="ml-4 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full">
          <Search size={22} />
        </button>

      </div>
    </div>
  );
};

export default Header;
