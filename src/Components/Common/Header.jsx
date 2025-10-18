import React from "react";

const Header = ({ title }) => {
  return (
    <header
      className="header"
      style={{
        position: "relative",
        padding: "4rem 1rem",
        background: "linear-gradient(135deg, #111, #333)",
        color: "#FFD700",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay for subtle effect */}
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at center, rgba(255, 215, 0, 0.08), transparent 70%)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <h1
          className="header-title"
          style={{
            fontSize: "3rem",
            fontWeight: "900",
            color: "#FFD700",
            textShadow: "0 0 5px rgba(255, 255, 0, 0.7)",
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;

