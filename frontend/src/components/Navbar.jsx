import { LogOut, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navStyle = ({ isActive }) =>
    `pb-1 text-lg font-medium transition ${
      isActive
        ? "border-b-2 border-rose-500"
        : "hover:text-rose-500"
    }`;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md text-black"
          : "bg-transparent text-white"
      }`}
    >
      <div className="w-full px-8 h-20 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/home")}
          className="text-2xl font-bold cursor-pointer"
        >
          StayNest
        </h1>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-8">
          <li><NavLink to="/home" className={navStyle}>Home</NavLink></li>
          <li><NavLink to="/user-experience" className={navStyle}>Experiences</NavLink></li>
          <li><NavLink to="/services" className={navStyle}>Services</NavLink></li>
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* LOGIN / LOGOUT */}
          {!token ? (
            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                scrolled
                  ? "bg-white text-black border-gray-300"
                  : "bg-white/20 backdrop-blur-md text-white border-white/40"
              }`}
            >
              <User size={18} />
              <span className="text-sm font-medium">Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

          {/* MENU */}
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-full border transition ${
              scrolled
                ? "bg-white border-gray-200"
                : "bg-white/20 text-black/20 border-white/40"
            }`}
          >
            <Menu size={20} />
          </button>

        {/* DROPDOWN */}
{open && (
  <div className="absolute right-0 top-16 w-56 bg-white text-black rounded-xl shadow-lg border border-gray-200 overflow-hidden">

    <Link
      to="/host"
      className="block px-4 py-3 hover:bg-gray-100 transition"
      onClick={() => setOpen(false)}
    >
      Become a Host
    </Link>

    <Link
      to="/about"
      className="block px-4 py-3 hover:bg-gray-100 transition"
      onClick={() => setOpen(false)}
    >
      About Us
    </Link>

    <Link
      to="/contact"
      className="block px-4 py-3 hover:bg-gray-100 transition"
      onClick={() => setOpen(false)}
    >
      Contact Us
    </Link>

  </div>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
