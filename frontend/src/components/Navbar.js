import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/apiService';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Watch for route changes or storage changes
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUsername(parsed.username || '');
        setIsLoggedIn(true);
      } catch {
        setUsername('');
        setIsLoggedIn(false);
      }
    } else {
      setUsername('');
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // re-check on page/route change

  const handleLogout = () => {
    logout();
    setUsername('');
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-indigo-600">ShareScribe</h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/feed" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
                Feed
              </Link>
              <Link
                to="/create"
                className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
              >
                Create Post
              </Link>
              <span className="text-gray-400 text-sm hidden sm:inline">|</span>
              <span className="text-gray-500 text-sm hidden sm:inline">{username}</span>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/feed"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
              >
                Feed
              </Link>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
              >
                Create Post
              </Link>
              <div className="px-2 text-sm text-gray-500">
                Logged in as <b>{username}</b>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
