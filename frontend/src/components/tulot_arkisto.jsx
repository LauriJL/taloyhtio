// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

// Assets
import TulotModule from "./tulot_module";

function TulotArkisto(props) {
  const baseURL = "http://127.0.0.1:8000/api/tulotarkisto/";
  const year = parseInt(props.yr);
  const linkTulot = baseURL + `${year}` + `-01-01&` + `${year}` + `-12-31`;
  const [tulot, setTulot] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  const fetchData = async () => {
    let response = await (await fetch(linkTulot)).json();
    setTulot(response.results);

    // Page count
    setTotalPages(Math.ceil(response.count / 8));
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
      <li className="page-item" key={i}>
        <Link
          onClick={() => paginationHandler(linkTulot + `?page=${i}`)}
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
          <div className="row">
            <TulotModule key={tulot.id} tulotmenot={tulot} />
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

export default TulotArkisto;
