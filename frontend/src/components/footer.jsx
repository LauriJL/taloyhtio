import React from "react";

function Footer() {
  function paivitetty() {
    var nowDate = new Date();
    const time = nowDate.toTimeString().slice(0, 9);
    console.log(time);
    var date =
      nowDate.getDate() +
      "." +
      (nowDate.getMonth() + 1) +
      "." +
      nowDate.getFullYear() +
      " klo " +
      time;
    return date;
  }
  return (
    <footer className="container d-flex flex-wrap justify-content-between align-items-center py-2 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center r-4">
        <span className="mb-3 mb-md-0 text-muted">
          © 2023 As Oy Taloyhtiö Ab
        </span>
      </div>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <p className="mb-3 mb-md-0" href="#">
            Tiedot päivitetty {paivitetty()}
          </p>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
