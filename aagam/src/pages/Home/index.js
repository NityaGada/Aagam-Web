// import { Link } from "react-router-dom";
import "./index.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Homecard from "../../components/Homecard";
import Model from "../../assets/model copy.png";
import Contact from "../../assets/contact.png";
import wa from "../../assets/whatsapp.png";
import insta from "../../assets/insta.png";
import gmail from "../../assets/gmail.png";
import fb from "../../assets/fb.png";
import NawabiModel from "../../assets/model.png";
import bodypart from "../../assets/face_and_hands.png";
import { Helmet } from 'react-helmet';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => {
        navigate("/customize/Nawabi", {
          state: {
            image1: NawabiModel,
            image2: "",
            ogimage: NawabiModel,
            handsface: bodypart,
          },
        });
      }}>
        View Nawabi
      </button>
      <div className="content">
      <Helmet>
      <meta name="keywords" content="Jodhpuri Near Me, Wedding Store Near Me, Menswear Store, Jodhpuri Suit Store, Jodhpuri Coat Store, Mens Wedding Wear Store, Ethnic Shoes, Wedding Shoes, Handmade Shoes, Designer Shoes, Handcrafted Shoes, Suiting, Shirting, Traditional Wear, Kurta, Designer Kurta, Bandhgala, Achkan, Tie, Bowtie, Cufflinks, Lapel Pin, Broach, Readymade Wedding Wear Clothes, Ethnic Clothes" />
      </Helmet>
        <div className="text">
          <h2 style={{ color: "black", fontSize: "50px"}}>TRY OUT OUR <br></br> PRODUCTS LIVE</h2>
          <div style={{ letterSpacing: "0.111px", paddingTop:"15px", paddingBottom:"15px"}}>
          Get a look at the finished products as our software drapes your selected material on a model
          </div>
          <div className="buttons">
            <button className="b1">TRY NOW</button> <br></br>
            <button className="b2">KNOW MORE</button>
          </div>
        </div>
        <div className="image">
          <img className="img" src={Model} alt="model" />
        </div>
      </div>

      <div className="collection">
        <h2 style={{ fontSize: "50px", marginLeft:"40px", marginTop:"20px", marginBottom:"30px"}}>OUR COLLECTIONS</h2>

        <div className="cards-container">
          <Homecard
            content="Card 1."
            to="/page1"
          />
          <Homecard
            content="Card 2."
            to="/page2"
          />
          <Homecard
            content="Card 3."
            to="/page3"
          />
        </div>


        <div style={{ textAlign: "center", paddingBottom: "5%" }}>
          <button className="b3">Explore</button>
        </div>
      </div>

      <div className="location">
        <h2 style={{ paddingBottom: "5%" }}>WE ARE HERE</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.5025825910084!2d73.01175476380324!3d26.277802588314376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c36fc45fd23%3A0xa1a66a4a32a91660!2sAagam%20(%20Saleraj%20Chandanmal%20Jain%20)!5e0!3m2!1sen!2sin!4v1706011994120!5m2!1sen!2sin" 
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
             Ist 'C' Road, <br></br>
             Near Azad Hind College,<br></br>
             Sardarpura, <br></br>
             Jodhpur - 342 003
          </div>
          <div className="contacts">
            <img src={Contact} alt="phone" /> 291-2614333 / 9829668333 <br></br>
            <div style={{ width: "100%" }}>
              <a href="https://g.page/r/CWAWqTJKaqahEBM/" target="_blank" rel="noopener noreferrer"><img src={wa} alt="wa" style={{ width: "20%" }} /></a>
              <a href="https://www.facebook.com/Aagampage/" target="_blank" rel="noopener noreferrer"><img src={insta} alt="insta" style={{ width: "20%" }} /></a>
              <a href={`mailto:${'aagamsaleraj@gmail.com'}`}><img src={gmail} alt="gmail" style={{ width: "20%" }} /></a>
              <a href="https://www.instagram.com/aagamjodhpur/" target="_blank" rel="noopener noreferrer"><img src={fb} alt="fb" style={{ width: "20%" }} /></a>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
