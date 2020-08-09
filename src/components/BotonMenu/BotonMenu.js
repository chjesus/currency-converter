import React from "react";
import "./botonmenu.css";

function BotonMenu(props) {
  return (
    <button type="button" className="wrapper__panel--btn">
      <a href="http://" className="btn__link">
        {props.title}
      </a>
    </button>
  );
}

export default BotonMenu;
