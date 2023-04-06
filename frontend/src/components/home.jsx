// Packages
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

//Assets
import TulotCard from "./tulot_card";
import MenotCard from "./menot_card";
import TaseCard from "./tase_card";

const baseURL = "http://127.0.0.1:8000/api";
// const [year, setYear] = useState();
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function Saldo() {
  const [year, setYear] = useState();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const link = `${baseURL}/summat/`;
  const [tulotmenot, setTulotmenot] = useState([]);

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setTulotmenot(response.results);
    setYear(currentYear);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mt-4">
      <h3>{year}</h3>
      <div className="row">
        <div className="col-md-12 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <Link to="/tulot" className="text-decoration-none text-dark">
                <TulotCard key={tulotmenot.id} tulotmenot={tulotmenot} />
              </Link>
            </div>
            <div className="col-md-4 mb-2">
              <Link to="/menot" className="text-decoration-none text-dark">
                <MenotCard key={tulotmenot.id} tulotmenot={tulotmenot} />
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
  );
}

export default Saldo;
