import React from "react";
import "../assets/css/landing.css";
import woman from "../assets/img/bla.png";

const Landing = () => {
  return (
    <div className="wrap">
      <header>
        <div className="logo">ALT F4</div>
        <div className="menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Portfolio</a>
            </li>
            <li>
              <a href="/">Partners</a>
            </li>
            <li>
              <a href="/">Contacts</a>
            </li>
          </ul>
        </div>
      </header>
      <div className="flex-container">
        <div className="content">
          <h1> We will make your event unforgettable</h1>
          <p>
            {" "}
            Specify the number of guests,desirable time visit, and also any
            other additional information. We will call you back as soon as
            possible{" "}
          </p>
          <div className="btn-grp">
            <a href="/" className="color1">
              Reserve
            </a>
            <a href="/" className="color2">
              Show Video
            </a>
          </div>
        </div>
        <svg
          className="wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#5000ca"
            fillOpacity="1"
            d="M0,320L48,266.7C96,213,192,107,288,85.3C384,64,480,128,576,170.7C672,213,768,235,864,234.7C960,235,1056,213,1152,181.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="photo">
          <img alt="bla.png" src={woman} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
