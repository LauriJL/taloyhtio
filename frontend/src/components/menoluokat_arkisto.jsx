// Packages
import { useState, useEffect } from "react";
import React from "react";
import { Pie } from "react-chartjs-2";

// Assets
// import Year from "./year";

function MenoLuokatArkisto(props) {
  const year = parseInt(props.yr);
  const baseURL = "http://127.0.0.1:8000/api/menotluokittainarkisto";
  const linkLuokat = `${baseURL}/${year}`;
  const [tiedot, setTiedot] = useState([]);

  const fetchData = async () => {
    let response = await (await fetch(linkLuokat)).json();
    setTiedot(response.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let data_1 = [];
  let data_2 = [];
  let labels_ = [];
  tiedot.forEach((index) => {
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

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-12 col-12 mb-2 text-start">
          <br />
          <Pie data={data} height={100} />
        </div>
      </div>
    </section>
  );
}

export default MenoLuokatArkisto;
