// Packages
import React from "react";

function TulotModule(props) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-12 mb-2 text-start">
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Maksaja</th>
                    <th>Summa</th>
                    <th>Maksupvm</th>
                    <th>Luokka</th>
                  </tr>
                </thead>
                <tbody>
                  {props.tulotmenot.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.maksaja.nimi}</td>
                        <td>{item.summa}</td>
                        <td>{item.maksupvm}</td>
                        <td>{item.luokka.tuloluokka}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TulotModule;
