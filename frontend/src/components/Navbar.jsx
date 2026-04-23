import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navStyle = ({ isActive }) =>
    `pb-2 text-lg font-semibold transition-all duration-200 border-b-2 ${
      isActive
        ? "border-black text-black"
        : "border-transparent text-gray-600 hover:text-black hover:border-gray-300"
    }`;

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
      <div className="w-full px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-rose-500 cursor-pointer">
          StayNest
        </h1>

        {/* Center Nav */}
        <ul className="hidden md:flex items-center gap-10">
          <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
          <li><NavLink to="/user-experience" className={navStyle}>Share Your Experiences</NavLink></li>
          <li><NavLink to="/services" className={navStyle}>Services</NavLink></li>
        </ul>

        {/* Right Side */}
        <div className="relative">

          {/* Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-full hover:shadow-md transition bg-white"
          >
            <Menu size={22} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

              <Link
                to="/host"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Become a Host
              </Link>

              <Link
                to="/about"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                to="/Login"
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >Login/Signup
              </Link>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
