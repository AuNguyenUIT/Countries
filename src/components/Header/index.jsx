import React from "react";
import "./style.scss";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

Header.propTypes = {
  mode: PropTypes.bool,
  onChangeMode: PropTypes.func
};

function Header({mode, onChangeMode}) {
    const  handleChange=(e)=>{
        onChangeMode(e.target.checked);

    }
    let checked=mode?"checked":"";
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__title">Where in the world?</Link>
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
