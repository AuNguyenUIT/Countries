import React from "react";
import "./style.scss";

Header.propTypes = {};

function Header({mode, onChangeMode}) {
    const  handleChange=(e)=>{
        onChangeMode(e.target.checked);

    }
    let checked=mode?"checked":"";
  return (
    <header className="header">
      <div className="container header__inner">
        <h2 className="header__title">Where in the world?</h2>
        <div className="header__action">
          <input type="checkbox" name="darkmode" className="switch__mode" onChange={handleChange} checked={checked}
         />
        </div>
      </div>
      <script src="./darkmode.js"></script>
    </header>
  );
}

export default Header;
