import React from "react";
import Contact from "../../assets/contact.png"; // Import your contact icons here
import wa from "../../assets/whatsapp.png";
import insta from "../../assets/insta.png";
import gmail from "../../assets/gmail.png";
import fb from "../../assets/fb.png";
import logo from "../../assets/logo.png";

export default function Footer(props) {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "20px", fontSize: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ marginRight: 10, width:"50%" }} />
        </div>
        <div className="content" style={{ display: "flex", alignItems: "center" }}>
          <div className="address" style={{ marginRight: "20px", color:"white" }}>
            Shop Number 7, <br />
            Borivali Shopping Centre, <br />
            Chandavarkar Rd, Shanti Nagar
          </div>
          <div>
            <img src={Contact} alt="phone" /> 987654332 / 9999333333 <br />
            <div style={{ display: "flex" }}>
              <img src={wa} alt="wa" style={{ width: "20%", marginRight: "10px" }} />
              <img src={insta} alt="insta" style={{ width: "20%", marginRight: "10px" }} />
              <img src={gmail} alt="gmail" style={{ width: "20%", marginRight: "10px" }} />
              <img src={fb} alt="fb" style={{ width: "20%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
