import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full mt-16 backdrop-blur-md bg-black/60 text-white px-8 py-12 border-t border-white/10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        
        {/* Logo */}
        <div>
          <Link to="/" className="text-3xl font-bold text-pink-500">
            StayNest
          </Link>

          <p className="text-gray-400 mt-3">
            Find your perfect stay anywhere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-2xl mt-5">
            <a href="#" className="hover:text-red-500 transition">
              <FaGoogle />
            </a>

            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore</h2>

          <Link to="/" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Home
          </Link>

          <Link to="/apartments" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Apartment
          </Link>

          <Link to="/villas" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Villas
          </Link>

          <Link to="/trending" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Trending
          </Link>

          <Link to="/new-listing" className="block text-gray-400 hover:text-white hover:underline">
            New Listing
          </Link>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Support</h2>

          <Link to="/help" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Help Center
          </Link>

          <Link to="/contact" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Contact Us
          </Link>

          <Link to="/cancellation" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Booking Cancellation
          </Link>

          <Link to="/guide" className="block text-gray-400 hover:text-white hover:underline">
            Booking Guide
          </Link>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Company</h2>

          <Link to="/about" className="block text-gray-400 hover:text-white hover:underline mb-2">
            About Us
          </Link>

          <Link to="/career" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Career
          </Link>

          <Link to="/terms" className="block text-gray-400 hover:text-white hover:underline mb-2">
            Terms & Condition
          </Link>

          <Link to="/privacy" className="block text-gray-400 hover:text-white hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-6">
        <p>© 2026 StayNest | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
