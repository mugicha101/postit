import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="masthead">
    <div>
      <div>
        <Link to="/">
          <h2 className="text-center">PostIt</h2>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
