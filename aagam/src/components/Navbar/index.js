import "./index.css";

import { useState } from "react";
import { Link } from 'react-router-dom';

import User from "../../assets/user.png";
import Menu from "../../assets/menu.png";

export default function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <img src={Menu} alt="menubutton" />
        Menu
        {/* <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i> */}
      </div>
      <div
        className={`menu ${menuOpen ? "open" : ""}`}
        onMouseLeave={closeMenu}
      >
        <ul>
          <li>Nawabi</li>
          <li>Jodpuri</li>
          <li>Kurta</li>
          <li>Nehru Jacket</li>
          <li>Shirt</li>
        </ul>
      </div>
      <div className="brand">
        <p>AAGAM</p>
      </div>
      <div className="actions">
      <Link to="/login">
        <button
          className="account"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <img src={User} alt="User" />
          <p>Account</p>
        </button>
      </Link>
      </div>
    </div>
  );
}
