// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Tulot() {
  const baseURL = "http://127.0.0.1:8000/api/tulot/";
  const link = `${baseURL}`;
  const [tulot, setTulot] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setTulot(response.results);

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
    setTulot(response.results);
  };

  // Pagination links
  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    links.push(
      <li className="page-item">
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
                <tbody>
                  {tulot &&
                    tulot.map((item) => {
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
                <i className="fa-solid fa-angles-right"></i> Seuraava
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
    </section>
  );
}

export default Tulot;
