// Packages
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";

// Assets
import LaskunTiedotCard from "./laskuntiedot_card";

function LaskunTiedot(props) {
  const { id } = useParams();

  const baseURL = "http://127.0.0.1:8000/api";
  const link = `${baseURL}/menot/${id}`;
  const [lasku, setLasku] = useState([]);
  console.log(link);

  const fetchData = async () => {
    let response = await (await fetch(link)).json();
    setLasku(response);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //console.log(lasku);

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-9 col-12 mb-2 text-start">
          <LaskunTiedotCard key={lasku.id} lasku={lasku} />
        </div>
      </div>
    </section>
  );
}

export default LaskunTiedot;
