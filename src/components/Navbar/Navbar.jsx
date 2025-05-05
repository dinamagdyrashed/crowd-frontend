import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../../api/auth';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';
import AuthPopup from '../../components/AuthPopup';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    setUser(authAPI.getCurrentUser());

    const handleStorageChange = () => {
      setUser(authAPI.getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('storage'));
    setUser(null);
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStartCampaign = () => {
    if (user) {
      window.location.href = '/create-campaign';
    } else {
      setShowAuthPopup(true);
    }
  };

  const handleAuthConfirm = () => {
    setShowAuthPopup(false);
    window.location.href = '/register';
  };

  const handleAuthCancel = () => {
    setShowAuthPopup(false);
  };

  const navItemClass =
    'px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#E8F3F3] hover:text-[#006A71] transition duration-200';

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      {showAuthPopup && <AuthPopup onConfirm={handleAuthConfirm} onCancel={handleAuthCancel} />}

      <div className="max-w-[95%] sm:max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center relative">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#006A71] hover:text-[#04828c] transition"
          >
            {isMenuOpen ? <FaTimes size={20} sm:size={24} /> : <FaBars size={20} sm:size={24} />}
          </button>
        </div>

        {/* Left Links */}
        <div className="hidden lg:flex space-x-2 sm:space-x-3 items-center">
          <NavLink to="/campaigns" className={navItemClass}>
            Campaigns
          </NavLink>
          <NavLink to="/finished-campaigns" className={navItemClass}>
            Finished Campaigns
          </NavLink>
          <NavLink to="/categories" className={navItemClass}>
            Categories
          </NavLink>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:mx-auto">
          <NavLink
            to="/home"
            className="flex items-center space-x-2 text-xl sm:text-2xl font-bold tracking-wide text-[#006A71]"
          >
            <img
              src="public\Preview (2).png"
              alt="Athr_Logo"
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-full"
            />
            <span>Athr</span>
          </NavLink>
        </div>

        {/* Right Links */}
        <div className="hidden lg:flex space-x-2 sm:space-x-4 items-center ml-auto">
          <NavLink to="/about" className={navItemClass}>
            About Us
          </NavLink>
          {user ? (
            <>
              <button
                onClick={handleStartCampaign}
                className="border border-[#006A71] text-[#006A71] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-[#006A71] hover:text-white transition text-xs sm:text-sm"
              >
                Start New Campaign
              </button>
              <NavLink to="/profile" className={navItemClass}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-[#DC2626] hover:text-red-700 transition p-2 rounded-full hover:bg-red-100"
              >
                <FiLogOut size={16} sm:size={20} />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navItemClass}>
                Sign in
              </NavLink>
              <button
                onClick={handleStartCampaign}
                className="border border-[#006A71] text-[#006A71] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-[#006A71] hover:text-white transition text-xs sm:text-sm"
              >
                Start New Campaign
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-56 sm:w-64 lg:w-72 bg-white shadow-lg z-50 p-4 sm:p-6 overflow-y-auto flex flex-col space-y-3 sm:space-y-4"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4 sm:mb-6">
              <button
                onClick={toggleMenu}
                className="text-[#006A71] hover:text-[#04828c]"
              >
                <FaTimes size={20} sm:size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <NavLink
              to="/home"
              onClick={toggleMenu}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
            >
              Home
            </NavLink>

            <NavLink
              to="/campaigns"
              onClick={toggleMenu}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
            >
              Campaigns
            </NavLink>

            <NavLink
              to="/finished-campaigns"
              onClick={toggleMenu}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
            >
              Finished Campaigns
            </NavLink>

            <NavLink
              to="/categories"
              onClick={toggleMenu}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
            >
              Categories
            </NavLink>

            <NavLink
              to="/about"
              onClick={toggleMenu}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
            >
              About
            </NavLink>

            {user ? (
              <>
                <button
                  onClick={() => {
                    handleStartCampaign();
                    toggleMenu();
                  }}
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-[#006A71] text-[#006A71] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
                >
                  Start New Campaign
                </button>

                <NavLink
                  to="/profile"
                  onClick={toggleMenu}
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  title="Logout"
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 text-red-600 hover:text-white hover:bg-red-600 rounded-md text-center transition flex items-center justify-center space-x-2 text-xs sm:text-sm"
                >
                  <FiLogOut size={16} sm:size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 text-[#1e1e1e] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
                >
                  Sign in
                </NavLink>

                <button
                  onClick={() => {
                    handleStartCampaign();
                    toggleMenu();
                  }}
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-[#006A71] text-[#006A71] hover:bg-[#006A71] hover:text-white rounded-md text-center transition text-xs sm:text-sm"
                >
                  Start New Campaign
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;