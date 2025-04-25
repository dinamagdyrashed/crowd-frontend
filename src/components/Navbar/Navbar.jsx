import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../../api/auth';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="bg-background text-text-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-text-dark hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Left side - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/search" className="flex items-center gap-1 hover:text-primary">
            <FaSearch className="text-sm" />
            <span>Search</span>
          </NavLink>
          <NavLink to="/home" className="hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/projects" className="hover:text-primary">
            Projects
          </NavLink>
        </div>

        {/* Center logo */}
        <NavLink
          to="/home"
          className="text-primary text-xl font-bold tracking-wide mx-auto md:mx-0"
        >
          Crowd<span className="text-secondary">Funding</span>
        </NavLink>

        {/* Right side - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/about" className="hover:text-primary">
            About
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className="hover:text-primary">Profile</NavLink>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-primary">Sign in</NavLink>
              <NavLink
                to="/register"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-1 px-3 rounded-full transition"
              >
                Start a GoFundMe
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-white shadow-md z-50 py-4 px-4">
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/search"
                className="flex items-center gap-1 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSearch className="text-sm" />
                <span>Search</span>
              </NavLink>
              <NavLink
                to="/home"
                className="hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                className="hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="hover:text-primary"
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
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-1 px-3 rounded-full transition text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start a GoFundMe
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;