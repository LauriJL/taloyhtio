// Packages
import React from "react";
import Alert from "react-bootstrap/Alert";
import "../App.css";

function Year(props) {
  return (
    <>
      <Alert variant={"primary"} className="alert-year">
        {props.year}
      </Alert>
    </>
  );
}

export default Year;
