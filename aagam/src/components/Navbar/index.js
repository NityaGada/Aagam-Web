import "./index.css";

import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import User from "../../assets/user.png";
import Menu from "../../assets/menu.png";
import Nav from "../../assets/nav.png";
import NawabiModel from "../../assets/model.png";
import bodypart from "../../assets/face_and_hands.png";

export default function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigate = useNavigate();

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
          <li>
          <button
            onClick={() => {
              navigate("/customize/Nawabi", {
                state: {
                  image1: NawabiModel,
                  image2: "",
                  ogimage: NawabiModel,
                  handsface: bodypart,
                },
              });
            }}
          >
           Nawabi
          </button>
          </li>
          <li>Jodpuri</li>
          <li>Kurta</li>
          <li>Nehru Jacket</li>
          <li>Shirt</li>
        </ul>
      </div>
      <div className="brand">
        <img src={Nav} alt="nav" width={"33%"}></img>
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
