// Packages
import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";

// Assets
import Sidebar from "./sidebar";
import LaskunTiedotCard from "./laskuntiedot_card";
import LaskunErittelyCard from "./laskunerittely_card";

function LaskunErittely(props) {
  const { id } = useParams();

  const baseURL = "http://127.0.0.1:8000/api";
  const link = `${baseURL}/erittely/${id}`;
  const [menoerittely, setErittely] = useState([]);
  console.log(link);

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setErittely(response);
    //console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2 text-start">
          <LaskunErittelyCard
            key={menoerittely.id}
            menoerittely={menoerittely}
          />
        </div>
      </div>
    </section>
  );
}

export default LaskunErittely;
