// Packages
import { useState, useEffect } from "react";
import React from "react";

// react-bootstrap
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tabStyles.css";

//Assets
import TulotCard from "./tulot_card";
import MenotCard from "./menot_card";
import TaseCard from "./tase_card";
import Year from "./year";
import Menot from "./menot";
import Tulot from "./tulot";
import MenoLuokat from "./menoluokat";

function Saldo() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [year, setYear] = useState();
  const [tulotmenot, setTulotmenot] = useState([]);

  // URLs
  const baseURLSummat = "http://127.0.0.1:8000/api/summat";
  const linkSummat = `${baseURLSummat}`;

  // Fetch summat
  const fetchSummat = async () => {
    let response = await (await fetch(linkSummat)).json();
    setTulotmenot(response.results);
    setYear(currentYear);
  };

  useEffect(() => {
    fetchSummat();
  }, []);

  return (
    <Container className="py-4">
      <Year key={currentYear} year={currentYear} />
      <Container>
        <Row className="justify-content-center">
          <Tabs
            justify
            variant="pills"
            defaultActiveKey={1}
            className="mb-1 p-0"
          >
            <Tab eventKey={1} title="Saldo">
              <section className="container mt-4">
                <div className="row">
                  <div className="col-md-12 col-12 mb-2">
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <TulotCard
                          key={tulotmenot.id}
                          tulotmenot={tulotmenot}
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <MenotCard
                          key={tulotmenot.id}
                          tulotmenot={tulotmenot}
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <TaseCard key={tulotmenot.id} tulotmenot={tulotmenot} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Tab>
            <Tab eventKey={2} title="Menot">
              <section className="container mt-4">
                <div className="row">
                  <div className="col-md-12 col-12 mb-2 text-start">
                    <br />
                    <div className="row">
                      <Menot />
                    </div>
                  </div>
                </div>
              </section>
            </Tab>
            <Tab eventKey={3} title="Menot luokittain">
              <div className="row">
                <div className="col-md-12 col-12 mb-2 text-start">
                  <br />
                  <MenoLuokat />
                </div>
              </div>
            </Tab>
            <Tab eventKey={4} title="Tulot">
              <section className="container mt-4">
                <div className="row">
                  <Tulot />
                </div>
              </section>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </Container>
  );
}

export default Saldo;
