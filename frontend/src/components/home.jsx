// Packages
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

//Assets
import TulotCard from "./tulot_card";
import MenotCard from "./menot_card";
import TaseCard from "./tase_card";

const baseURL = "http://127.0.0.1:8000/api";

function Saldo() {
  //const { id } = useParams();
  const link = `${baseURL}/summat/`;
  const [tulotmenot, setTulotmenot] = useState([]);

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setTulotmenot(response.results);
    console.log("response: ", response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //console.log("tulotmenot: ", tulotmenot);

  return (
    <section className="container mt-4">
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
