import React, { useState,  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../Redux/CurrencySlice';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currency, currencies } = useSelector((state) => state.currency);

  // Handle currency change
  const handleCurrencyChange = (event) => {
    dispatch(setCurrency(event.target.value));
  };

  const [userInitial, setUserInitial] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const userName = localStorage.getItem('userName');
    
    if (userName) {
      const initial = userName.charAt(0).toUpperCase(); // Get the first letter of the name
      setUserInitial(initial);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('EmailID');
    navigate('/login');
  };


  return (
    <nav className="bg-secondary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:opacity-80">CPM</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:opacity-80">About</Link>
          <Link to="/investment" className="hover:opacity-80">Invest</Link>
          <a href="#contact" className="hover:opacity-80">Contact</a>

          {/* Currency Dropdown */}
          <select
            value={currency.code}
            onChange={handleCurrencyChange}
            className="bg-white text-black p-2 text-xs rounded shadow-sm border-none"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} - {currency.code}
              </option>
            ))}
          </select>
          {/* User Profile with Dropdown */}
          {userInitial && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full focus:outline-none"
              >
                {userInitial}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black border rounded shadow-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;