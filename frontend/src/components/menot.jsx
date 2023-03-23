// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Menot() {
  const baseURL = "http://127.0.0.1:8000/api/menot/";
  const link = `${baseURL}`;

  const [menot, setMenot] = useState([]);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();
  const [year, setYear] = useState();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    // Rebder only bills paid during current year.
    // I need to hack this here in frontend as year is an automatically generated value in db.
    // Have not (yet) been able to figure out how to get around this in backend/Django models&views.
    // NOTE: This means that Django pagination cannot be used
    // So I need to create a custom pagination component.
    setMenot(response.results.filter((o) => o.maksupvm.includes(currentYear)));
    setYear(currentYear);
    if (response.next) {
      setNextURL(response.next);
    } else {
      setNextURL(null);
    }

    if (response.previous) {
      setPrevURL(response.previous);
    } else {
      setPrevURL(null);
    }
  };

  const paginationHandler = async (url) => {
    let response = await (await fetch(url)).json();
    setNextURL(response.next);
    setPrevURL(response.previous);
    setMenot(response.results.filter((o) => o.maksupvm.includes("2023")));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-12 col-12 mb-2 text-start">
          <h4>Laskut ({year})</h4>
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
            {/* Pagination start */}
            <nav>
              <ul className="pagination justify-content-center">
                {!prevURL && (
                  <li className="page-item">
                    <button className="page-link disabled">
                      <i className="fa-solid fa-angles-left"></i> Edellinen
                    </button>
                  </li>
                )}
                {prevURL && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginationHandler(prevURL)}
                    >
                      <i className="fa-solid fa-angles-left"></i> Edellinen
                    </button>
                  </li>
                )}
                {!nextURL && (
                  <li className="page-item">
                    <button className="page-link disabled">
                      Seuraava <i className="fa-solid fa-angles-right"></i>
                    </button>
                  </li>
                )}
                {nextURL && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginationHandler(nextURL)}
                    >
                      Seuraava <i className="fa-solid fa-angles-right"></i>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
            {/* Pagination end */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menot;
