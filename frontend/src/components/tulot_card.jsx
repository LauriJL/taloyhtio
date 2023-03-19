// Packages
import React from "react";

function TulotCard(props) {
  console.log(props);

  return (
    <div className="col-12 col-md-12 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Tulot</h5>
        </div>
        <div className="card-body">
          {props.tulotmenot.map((tieto) => (
            <>
              <h5 key={tieto.id}>{tieto.tulot} €</h5>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TulotCard;
