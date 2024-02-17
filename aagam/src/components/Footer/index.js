import React from "react";
import Contact from "../../assets/contact2.png"; 
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
          <img src={logo} alt="logo" style={{ marginRight: 10, width:"50%", filter: 'brightness(0) invert(1)' }} />
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
              <a href="https://g.page/r/CWAWqTJKaqahEBM/" target="_blank" rel="noopener noreferrer"><img src={wa} alt="wa" style={{marginRight: "10px" }} /></a>
              <a href="https://www.facebook.com/Aagampage/" target="_blank" rel="noopener noreferrer"><img src={insta} alt="insta" style={{ marginRight: "10px" }} /></a>
              <a href={`mailto:${'aagamsaleraj@gmail.com'}`}><img src={gmail} alt="gmail" style={{marginRight: "10px" }} /></a>
              <a href="https://www.instagram.com/aagamjodhpur/" target="_blank" rel="noopener noreferrer"><img src={fb} alt="fb" style={{}} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
