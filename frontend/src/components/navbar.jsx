import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-regular";

function NavBar() {
  const baseURL = "http://127.0.0.1:8000/api/vuodet/";
  const link = `${baseURL}`;

  const [yr, setYr] = useState([]);

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    let yrs = [];
    response.results.forEach((element) => {
      yrs.push(element.vuosi);
    });
    yrs.pop();
    setYr(yrs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <style type="text/css">
        {`
          .navbar-color {
            background-color: #80489C;
            nav-link: white !important;
          }
          
          .navbar-brand {
            color: white !important;
          }

          .nav-link {
            color: white !important;
          }
        `}
      </style>
      <Navbar variant="color">
        <Container>
          <Navbar.Brand href="/">Oy Taloyhtiö Ab</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ms-auto">
              <NavDropdown title="Menot">
                <NavDropdown.Item href="/menot">Laskut</NavDropdown.Item>
                <NavDropdown.Item href="/menoluokat">
                  Menot luokittain
                </NavDropdown.Item>
                <NavDropdown.Item href="/menot_arkisto">
                  Arkisto
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tulot">
                <NavDropdown.Item href="/tulot">Tulot</NavDropdown.Item>
                <NavDropdown.Item href="/menot_arkisto">
                  Arkisto
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Arkisto">
                {yr.map((item) => (
                  <NavDropdown.Item href="#">{item}</NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown
                title={
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                }
              >
                <NavDropdown.Item href="#">Omat tiedot</NavDropdown.Item>
                <NavDropdown.Item href="#">Kirjaudu</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
