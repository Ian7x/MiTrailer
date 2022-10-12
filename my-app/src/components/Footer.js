import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="footer">
      <div className="singleCol social-media-icons-white">
        <a href="https://www.facebook.com/">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.linkedin.com/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <h1> Copyright © 2022 Designed by Ilxan Turxan.</h1>
    </div>
  );
}
