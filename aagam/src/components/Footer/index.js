import React from "react";
import CopyRight from "../../assets/copyright.png";
import Contact from "../../assets/contact.png"; // Import your contact icons here
import wa from "../../assets/whatsapp.png";
import insta from "../../assets/insta.png";
import gmail from "../../assets/gmail.png";
import fb from "../../assets/fb.png";
import logo from "../../assets/logo.png";

export default function Footer(props) {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "20px", fontSize: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ marginRight: 10, width:"50%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="address" style={{ marginRight: "20px", color:"white" }}>
             Ist 'C' Road, <br></br>
             Near Azad Hind College,<br></br>
             Sardarpura, <br></br>
             Jodhpur - 342 003
          </div>
          <div>
            <img src={Contact} alt="phone" /> 291-2614333 / 9829668333 <br />
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
