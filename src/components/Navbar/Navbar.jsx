import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../../api/auth';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { FaExclamationCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white/95 rounded-xl shadow-lg max-w-md w-full p-6 border border-[#9ACBD0]"
      >
        <div className="flex items-start mb-4">
          <FaExclamationCircle className="text-2xl text-[#006A71] mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-[#1e1e1e]">Account Required</h3>
            <p className="text-[#1e1e1e] mt-1">
              You need to register an account before starting a campaign. Would you like to register now?
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#9ACBD0] text-[#1e1e1e] hover:bg-[#F2EFE7] transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#006A71] hover:bg-[#04828c] text-white transition duration-200 flex items-center"
          >
            Register Now <FaArrowRight className="ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

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

  return (
    <nav style={{ backgroundColor: '#ffffff', color: '#1e1e1e' }} className="shadow-sm relative">
      {showAuthPopup && (
        <AuthPopup onConfirm={handleAuthConfirm} onCancel={handleAuthCancel} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            style={{ color: '#1e1e1e' }}
            className="hover:text-[#006A71] focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} className='text-[#006A71]' /> : <FaBars size={24} className='text-[#006A71]' />}
          </button>
        </div>

        {/* Left side - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">

          <NavLink to="/campaigns" className="hover:text-[#006A71]">
            Campaigns
          </NavLink>
          <NavLink to="/finished-campaigns" className="hover:text-[#006A71]">
            Finished Campaigns
          </NavLink>
          <NavLink to="/categories" className="hover:text-[#006A71]">
            Categories
          </NavLink>

        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/home"
            className="text-xl font-bold tracking-wide"
            style={{ color: '#006A71' }}
          >
            Athr
          </NavLink>
        </div>

        {/* Right side - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <NavLink to="/about" className="hover:text-[#006A71]">
            About
          </NavLink>
          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleStartCampaign}
                className="border font-medium py-1 px-3 rounded-full transition"
                style={{
                  borderColor: '#006A71',
                  color: '#006A71',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#006A71';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#006A71';
                }}
              >
                Start New Campaign
              </button>
              <NavLink to="/profile" className="hover:text-[#006A71]">
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink to="/login" className="hover:text-[#006A71]">
                Sign in
              </NavLink>
              <button
                onClick={handleStartCampaign}
                className="border font-medium py-1 px-3 rounded-full transition"
                style={{
                  borderColor: '#006A71',
                  color: '#006A71',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#006A71';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#006A71';
                }}
              >
                Start New Campaign
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 shadow-md z-50 py-4 px-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">

              <NavLink
                to="/home"
                className="hover:text-[#006A71]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/campaigns"
                className="hover:text-[#006A71]"
                onClick={() => setIsMenuOpen(false)}
              >
                Campaigns
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-[#006A71]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/finished-campaigns"
                className="hover:text-[#006A71]"
                onClick={() => setIsMenuOpen(false)}
              >
                Finished Campaigns
              </NavLink>

              {user ? (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      handleStartCampaign();
                      setIsMenuOpen(false);
                    }}
                    className="border font-medium py-1 px-3 rounded-full transition text-center"
                    style={{
                      borderColor: '#006A71',
                      color: '#006A71',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#006A71';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#006A71';
                    }}
                  >
                    Start New Campaign
                  </button>
                  <NavLink
                    to="/profile"
                    className="hover:text-[#006A71]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-red-600 hover:underline text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <NavLink
                    to="/login"
                    className="hover:text-[#006A71]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </NavLink>
                  <button
                    onClick={() => {
                      handleStartCampaign();
                      setIsMenuOpen(false);
                    }}
                    className="border font-medium py-1 px-3 rounded-full transition text-center"
                    style={{
                      borderColor: '#006A71',
                      color: '#006A71',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#006A71';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#006A71';
                    }}
                  >
                    Start New Campaign
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;