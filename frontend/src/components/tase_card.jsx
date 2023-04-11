// Packages
import React from "react";

function TaseCard(props) {
  return (
    <div className="col-12 col-md-12 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Tase</h5>
        </div>
        <div className="card-body">
          {props.tulotmenot.map((tieto) => (
            <h5
              key={tieto.id}
              style={{
                color: parseFloat(tieto.tase) < 0 ? "red" : "green",
              }}
            >
              {tieto.tase} €
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaseCard;
