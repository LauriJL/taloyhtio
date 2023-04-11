// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function MenotArkisto(props) {
  const year = parseInt(props.yr);
  const baseURL = "http://127.0.0.1:8000/api/menotarkisto/";
  const linkMenot = baseURL + `${year}` + `-01-01&` + `${year}` + `-12-31`;
  const [menot, setMenot] = useState([]);
  //Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  const fetchData = async () => {
    let response = await (await fetch(linkMenot)).json();

    setMenot(response.results);

    // Page count
    setTotalPages(Math.ceil(response.count / 10));
    // URL for next page
    if (response.next) {
      setNextURL(response.next);
    } else {
      setNextURL(null);
    }
    // URL for previous page
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
    setMenot(response.results);
  };

  // Pagination links
  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    links.push(
      <li className="page-item" key={i}>
        <Link
          onClick={() => paginationHandler(baseURL + `?page=${i}`)}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section className="container mt-4">
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
                              to={`../menot/${menot.id}`}
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
                  {links}
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
    </div>
  );
}

export default MenotArkisto;
