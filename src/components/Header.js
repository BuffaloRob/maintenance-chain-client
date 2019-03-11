import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        M/C
      </Link>
      <div className="right menu">
        <GoogleAuth />
        <Link to="/items/new" className="item">
          New Item
        </Link>
      </div>
    </div>
  );
};

export default Header;
