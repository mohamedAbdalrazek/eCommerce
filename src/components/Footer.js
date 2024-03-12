import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer--social">
          <span className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faInstagram} />
          </span>
        </div>
        <div className="footer--credit">

          Copyright © 2024 reserved by Mohamed Abdelazek.
        </div>
        <a href="#" className="footer--logo">
          {/* <img src="images/logo.png" alt="" /> */}
          Artifex
        </a>
      </div>
    </div>
  );
}
export default Footer;
