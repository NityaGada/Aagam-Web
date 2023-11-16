import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Model from "./model.png";
import Contact from "./contact.png";
import wa from "./whatsapp.png";
import insta from "./insta.png";
import gmail from "./gmail.png";
import fb from "./fb.png";
import Login from './Login';


function Card({ content, to }) {
    return (
      <Link to={to} className="card">
        <div className="card-content">{content}</div>
      </Link>
    );
  }


export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {
    // Show the login modal when the component mounts
    setShowLoginModal(true);
  }, []);

  const handleCloseLoginModal = () => {
    // Close the login modal
    setShowLoginModal(false);
  };


  return (
    <>

      <Login show={showLoginModal} handleClose={handleCloseLoginModal} />
      <button>
        <Link to="/customize/Nawabi">View Nawabi</Link>
      </button>

      <div className="content">
        <div className="text">
          <h2 style={{ color:"black", }}>TRY OUT OUR <br></br> PRODUCTS LIVE</h2>
          Get a look at the finished products as our software drapes your selected material on a model
          <div className="buttons">
            <button className="b1">Try Now</button> <br></br>
            <button>Know More</button>
          </div>
        </div>
        <div className="image">
          <img className="img" src={Model} alt="model" />
        </div>
      </div>

      <div className="collection">
      <h2>OUR COLLECTIONS</h2>
      
      <div className="cards-container">
        <Card
            content="Card 1."
            to="/page1"
        />
        <Card
            content="Card 2."
            to="/page2"
        />
        <Card
            content="Card 3."
            to="/page3"
        />
        </div>


      <div style={{ textAlign:"center", paddingBottom:"5%"}}>
      <button className="b3">Explore</button>
      </div>
      </div>

      <div className="location">
      <h2 style={{paddingBottom:"5%"}}>WE ARE HERE</h2> 
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1716914341905!2d72.85259617500695!3d19.231347747077677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d69f6e65d9%3A0x3b064a42def0a235!2sAagam%20ethnic!5e0!3m2!1sen!2sin!4v1698839107689!5m2!1sen!2sin"
      width="100%"
      height="450"
      title="map"
      style={{ border: "0" }}
      allowFullScreen   
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
        />
      <div className="content">
        <div className="address">
        Shop Number 7, <br></br>
        Borivali Shopping Centre, <br></br> 
        Chandavarkar Rd, Shanti Nagar
        </div>
        <div className="contacts">
        <img src={Contact} alt="phone" /> 987654332 / 9999333333 <br></br>
        <div style={{ width:"100%"}}>
        <img src={wa} alt="wa" style={{width:"20%"}} /> 
        <img src={insta} alt="insta" style={{width:"20%"}} /> 
        <img src={gmail} alt="gmail" style={{width:"20%"}} /> 
        <img src={fb} alt="fb" style={{width:"20%"}} />
        </div>
        </div>
      </div>
      </div>

    
    </>
  );
}
