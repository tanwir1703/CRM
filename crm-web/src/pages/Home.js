import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TypingEffect from '../components/TypingEffect';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex h-[90vh] items-center p-10 bg-gray-100 font-sans mt-2"> {/* Added mt-16 */}
        {/* Left Side */}
        <div className="flex-1 flex h-[40vh] bg-secondary justify-center items-center">
          <img
            src="earth-home.jpg" 
            alt="Earth in Hands"
            className="w-96 h-auto object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="relative flex-1 flex flex-col justify-center space-y-4 px-10">
          <span className="absolute top-4 right-4 text-sm text-gray-700 tracking-wider font-semibold uppercase">
            “Invest Wisely”
          </span>
          <h1 className="text-6xl font-bold text-primary py-10">
            Joy of Giving
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Instead of addressing major critical issues on the ground or reaching out to NGOs, I am presenting to the socially privileged a brilliant platform built to manage their Charity into different sectors thus contributing to making a positive difference.
          </p>
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-secondary text-white rounded transition hover:opacity-90 w-1/2"
            >
              Invest
            </button>
          </div>
        </div>
      </div>

      {/* Investment Section */}
      <div className="relative h-[100vh] w-full bg-[url('../public/invest_background.png')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
          <h2 className="text-4xl font-bold mb-8 ml-3">
          <TypingEffect text="Start Your Investment" />
          </h2>
          <div className="flex space-x-4">
            <Link to="/Investment">
            <button className="px-6 mx-12 py-3 bg-primary text-white rounded transition hover:opacity-90">
              One-Time
            </button>
            </Link>
            <Link to="/Investment">
            <button className="px-6 mx-12 py-3 bg-primary text-white rounded transition hover:opacity-90">
              Monthly
            </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
