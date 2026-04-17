import { Menu, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navStyle = ({ isActive }) =>
    `pb-2 text-lg font-semibold transition-all duration-200 border-b-2 ${
      isActive
        ? "border-black text-black"
        : "border-transparent text-gray-600 hover:text-black hover:border-gray-300"
    }`;

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="w-full px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-rose-500 cursor-pointer tracking-tight">
          StayNest
        </h1>

        {/* Center Nav */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <NavLink to="/" className={navStyle}>
              Homes
            </NavLink>
          </li>

          <li>
            <NavLink to="/experiences" className={navStyle}>
             Share Your Experiences
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={navStyle}>
              Services
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <button className="hidden md:block px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
            Become a host
          </button>

          <button className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-full hover:shadow-md transition bg-white">
            <Menu size={22} />
            <div className="bg-gray-500 rounded-full p-1">
              <User size={20} className="text-white" />
            </div>
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
