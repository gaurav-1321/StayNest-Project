import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full mt-16 bg-black text-gray-300 px-8 py-14 border-t border-gray-800">

      {/* TOP */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 border-b border-gray-800 pb-10">
        
        {/* LOGO */}
        <div>
          <Link to="/" className="text-3xl font-bold text-rose-500">
            StayNest
          </Link>

          <p className="text-gray-500 mt-3">
            Find your perfect stay anywhere.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 text-xl mt-5">
            <a href="/google.com" className="hover:text-white transition">
              <FaGoogle />
            </a>

            <a href="/instagram.com" className="hover:text-white transition">
              <FaInstagram />
            </a>

            <a href="/facebook.com" className="hover:text-white transition">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Explore</h2>

          <Link to="/" className="block hover:text-white mb-2">Home</Link>
          <Link to="/apartments" className="block hover:text-white mb-2">Apartment</Link>
          <Link to="/villas" className="block hover:text-white mb-2">Villas</Link>
          <Link to="/trending" className="block hover:text-white mb-2">Trending</Link>
          <Link to="/new-listing" className="block hover:text-white">New Listing</Link>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Support</h2>

          <Link to="/help" className="block hover:text-white mb-2">Help Center</Link>
          <Link to="/contact" className="block hover:text-white mb-2">Contact Us</Link>
          <Link to="/cancellation" className="block hover:text-white mb-2">Cancellation</Link>
          <Link to="/guide" className="block hover:text-white">Booking Guide</Link>
        </div>

        {/* COMPANY */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Company</h2>

          <Link to="/about" className="block hover:text-white mb-2">About</Link>
          <Link to="/career" className="block hover:text-white mb-2">Career</Link>
          <Link to="/terms" className="block hover:text-white mb-2">Terms</Link>
          <Link to="/privacy" className="block hover:text-white">Privacy</Link>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 mt-8 text-sm">
        © 2026 StayNest · All rights reserved
      </div>

    </footer>
  );
};

export default Footer;
