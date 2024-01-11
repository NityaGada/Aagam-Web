import React from "react";
import CopyRight from "../../assets/copyright.png";

export default function Navbar(props) {
 

  return (
    <div style={{ backgroundColor:"black", color:"white", padding:"20px" , fontSize:30, height:"100px"}}>
    <img src={ CopyRight } alt="Copyright" />
     AAGAM
    </div>
  );
}
