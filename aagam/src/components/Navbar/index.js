import React, { useState } from "react";
import "./index.css";

export default function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="brand">
        <p>AAGAM</p>
      </div>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>Nawabi</li>
          <li>Jodpuri</li>
          <li>Kurta</li>
          <li>Nehru Jacket</li>
          <li>Shirt</li>
        </ul>
      </div>
      <div className="actions">
        <button className="account">Account</button>
        <button className="contact">Contact Us</button>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
    </div>
  );
}
