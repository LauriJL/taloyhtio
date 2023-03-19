// Packages
import { Link } from "react-router-dom";
import React from "react";

function Sidebar() {
  return (
    <div className="list-group">
      <Link
        to="/saldo"
        className="list-group-item list-group-item-action"
        aria-current="true"
      >
        Saldo
      </Link>
      <Link to="/menot" className="list-group-item list-group-item-action">
        Menot
      </Link>
      {/* <Link to="/menoluokat" className="list-group-item list-group-item-action">
        Menot luokittain
      </Link> */}
      <Link to="/tulot" className="list-group-item list-group-item-action">
        Tulot
      </Link>
    </div>
  );
}

export default Sidebar;
