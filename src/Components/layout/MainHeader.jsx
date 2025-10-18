import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const MainHeader = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Experience the Best Hospitality in Town",
        "Luxury Rooms at Affordable Prices",
        "Your Comfort is Our Priority",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      backDelay: 1500,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className="header-banner relative h-[100vh] bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10"></div>

      {/* Background subtle animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.08),transparent_70%)] animate-pulse"></div>

      {/* Content */}
      <div className="animated-texts overlay-content relative z-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-2xl animate-fadeInUp">
          Welcome to <span className="hotel-color text-yellow-400">BookingBro</span>
        </h1>

        {/* Typed.js Text */}
        <h4
          ref={typedRef}
          className="mt-6 text-2xl md:text-3xl font-semibold text-yellow-300 drop-shadow-lg tracking-wide animate-fadeInUp delay-200"
        ></h4>
      </div>
    </header>
  );
};

export default MainHeader;
