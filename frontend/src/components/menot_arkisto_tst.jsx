// react-bootstrap
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tabStyles.css";
import { Pie } from "react-chartjs-2";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

//Assets
import TulotCard from "./tulot_card";
import MenotCard from "./menot_card";
import TaseCard from "./tase_card";

function MenotArkistoTst() {
  const { yr } = useParams();

  const [year, setYear] = useState();
  const [tulotmenot, setTulotmenot] = useState([]);
  const [menot, setMenot] = useState([]);
  const [tulot, setTulot] = useState([]);
  const [menoluokat, setMenoluokat] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  // URLs
  const baseURLSummat = "http://127.0.0.1:8000/api/summatarkisto";
  const linkSummat = `${baseURLSummat}/${yr}`;
  const baseURLMenot = "http://127.0.0.1:8000/api/menotarkisto/";
  const linkMenot = baseURLMenot + `${yr}` + `-01-01&` + `${yr}` + `-12-31`;
  const baseURLTulot = "http://127.0.0.1:8000/api/tulotarkisto/";
  const linkTulot = baseURLTulot + `${yr}` + `-01-01&` + `${yr}` + `-12-31`;
  const baseURLLuokat = "http://127.0.0.1:8000/api/menotluokittainarkisto";
  const linkLuokat = `${baseURLLuokat}/${yr}`;

  // Fetch summat
  const fetchSummat = async () => {
    let response = await (await fetch(linkSummat)).json();
    setTulotmenot(response.results);
  };

  // Fetch menot
  const fetchMenot = async () => {
    let response = await (await fetch(linkMenot)).json();
    setMenot(response.results);
    setYear(yr.slice(0, 4));

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

  // Fetch tulot
  const fetchTulot = async () => {
    let response = await (await fetch(linkTulot)).json();
    setTulot(response.results);
    console.log("response tulot: ", response.results);

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

  // Fetch menot luokittain
  const fetchMenoLuokat = async () => {
    let response = await (await fetch(linkLuokat)).json();
    setMenoluokat(response.results);
    console.log("Menoluokat: ", response.results);
  };

  // Menoluokat
  let data_1 = [];
  let data_2 = [];
  let labels_ = [];
  menoluokat.forEach((index) => {
    labels_.push(index.luokka);
    data_1.push(index.summa);
  });

  data_2 = data_1.map(function (x) {
    return parseFloat(x, 10).toFixed(2);
  });

  let data = {
    labels: labels_,
    datasets: [
      {
        data: data_2,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  const paginationHandler = async (url) => {
    let response = await (await fetch(url)).json();

    setNextURL(response.next);
    setPrevURL(response.previous);
    setMenot(response.results);
  };

  useEffect(() => {
    fetchSummat();
    fetchMenot();
    fetchMenoLuokat();
    fetchTulot();
  }, []);

  return (
    <Container className="py-4">
      <h3>{yr}</h3>
      <Row className="justify-content-center">
        <Tabs justify variant="pills" defaultActiveKey={1} className="mb-1 p-0">
          <Tab eventKey={1} title="Saldo">
            <section className="container mt-4">
              <div className="row">
                <div className="col-md-12 col-12 mb-2">
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <Link
                        to="/tulot"
                        className="text-decoration-none text-dark"
                      >
                        <TulotCard
                          key={tulotmenot.id}
                          tulotmenot={tulotmenot}
                        />
                      </Link>
                    </div>
                    <div className="col-md-4 mb-2">
                      <Link
                        to="/menot"
                        className="text-decoration-none text-dark"
                      >
                        <MenotCard
                          key={tulotmenot.id}
                          tulotmenot={tulotmenot}
                        />
                      </Link>
                    </div>
                    <div className="col-md-4 mb-2">
                      <Link
                        to="#"
                        className="text-decoration-none text-dark hover-zoom"
                      >
                        <TaseCard key={tulotmenot.id} tulotmenot={tulotmenot} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Tab>
          <Tab eventKey={2} title="Laskut">
            <section className="container mt-4">
              <div className="row">
                <div className="col-md-12 col-12 mb-2 text-start">
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
                                    <i className="fa-solid fa-chart-pie"></i>{" "}
                                    Luokat
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
                              <i className="fa-solid fa-angles-left"></i>{" "}
                              Edellinen
                            </button>
                          </li>
                        )}
                        {prevURL && (
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => paginationHandler(prevURL)}
                            >
                              <i className="fa-solid fa-angles-left"></i>{" "}
                              Edellinen
                            </button>
                          </li>
                        )}
                        {!nextURL && (
                          <li className="page-item">
                            <button className="page-link disabled">
                              Seuraava{" "}
                              <i className="fa-solid fa-angles-right"></i>
                            </button>
                          </li>
                        )}
                        {nextURL && (
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => paginationHandler(nextURL)}
                            >
                              Seuraava{" "}
                              <i className="fa-solid fa-angles-right"></i>
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
          </Tab>
          <Tab eventKey={3} title="Menot luokittain">
            <div className="row">
              <div className="col-md-12 col-12 mb-2 text-start">
                <h4>Menot luokittain</h4>
                <br />
                <Pie data={data} height={100} />
              </div>
            </div>
          </Tab>
          <Tab eventKey={4} title="Tulot">
            <section className="container mt-4">
              <div className="row">
                <div className="col-md-12 col-12 mb-2 text-start">
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
                  {/* {links} */}
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
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default MenotArkistoTst;
