// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Menot() {
  const baseURL = "http://127.0.0.1:8000/api";
  const link = `${baseURL}/menot/`;

  const [menot, setMenot] = useState([]);
  // WIP: sums to table
  const [totalResult, setTotalResult] = useState(0);
  // WIP: pagination
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setMenot(response.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-12 col-12 mb-2 text-start">
          <h4>Laskut</h4>
          <br />
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {menot.map((menot) => {
                    return (
                      <tr key={menot.id}>
                        <td>{menot.saaja.nimi}</td>
                        <td>{menot.summa}</td>
                        <td>{menot.maksupvm}</td>
                        <td>{menot.luokka.menoluokka}</td>
                        <td>
                          <Link
                            to={`${menot.id}`}
                            className="btn btn-outline-success btn-sm"
                          >
                            <i className="fa-regular fa-eye"></i> Tiedot
                          </Link>
                        </td>
                        <td>
                          <Link
                            to="/menoluokat"
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="fa-solid fa-chart-pie"></i> Luokat
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
    </section>
  );
}

export default Menot;
