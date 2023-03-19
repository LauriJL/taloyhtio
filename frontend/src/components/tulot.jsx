// Packages
import { useState, useEffect } from "react";
import React from "react";

function Tulot() {
  const baseURL = "http://127.0.0.1:8000/api";
  const link = `${baseURL}/tulot/`;
  const [tiedot, setTiedot] = useState([]);
  // WIP: sums to table
  const [totalResult, setTotalResult] = useState(0);
  // WIP: pagination
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setTiedot(response.results);
    console.log(response.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-12 col-12 mb-2 text-start">
          <h4>Tulot</h4>
          <br />
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
                <tbody className="table-striped">
                  {tiedot.map((item) => {
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
      {/* WIP: pagination */}
      {/* <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> */}
    </section>
  );
}

export default Tulot;
