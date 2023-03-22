import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-regular";

function NavBar() {
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
              </NavDropdown>
              <Nav.Link href="/tulot">Tulot</Nav.Link>
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