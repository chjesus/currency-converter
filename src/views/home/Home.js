import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import BotonMenu from "../../components/BotonMenu/BotonMenu";

import logo from "../../images/undraw_digital.svg";

import "./home.css";

function Home() {
  return (
    <div className="wrapper">
      <NavBar />
      <div className="wrapper__options">
        <div className="wrapper__option">
          <div className="wrapper__panel">
            <BotonMenu title="Individual" />
            <BotonMenu title="Multiple" />
            <BotonMenu title="Referencias" />
          </div>
        </div>
        <div className="wrapper__image">
          <img src={logo} alt="Moneda Digital" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
