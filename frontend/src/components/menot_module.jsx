// Packages
import React from "react";
import { Link } from "react-router-dom";

function MenotModule(props) {
  return (
    <div className="row">
      <div className="col-md-12 col-12 mb-2 text-start">
        <div className="row">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Saaja</th>
                  <th>Summa</th>
                  <th>Maksupvm</th>
                  <th>Luokka</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.tulotmenot.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.saaja.nimi}</td>
                      <td>{item.summa}</td>
                      <td>{item.maksupvm}</td>
                      <td>{item.luokka.menoluokka}</td>
                      <td>
                        <Link
                          to={`menot/${item.id}`}
                          className="btn btn-outline-success btn-sm"
                        >
                          <i className="fa-regular fa-eye"></i> Tiedot
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenotModule;
