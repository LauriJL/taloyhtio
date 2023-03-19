// Packages
import React from "react";
import { Link } from "react-router-dom";

function LaskunTiedotCard(props) {
  console.log(props);

  return (
    <div className="col-12 col-md-12 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title" key={props.id}>
            Laskun tiedot
          </h5>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Summa:</td>
                <td>
                  <span className="text-muted">{props.lasku.summa} €</span>
                </td>
              </tr>
              <tr>
                <td>Eräpäivä:</td>
                <td>
                  <span className="text-muted">{props.lasku.erapvm}</span>
                </td>
              </tr>
              <tr>
                <td>Maksupäivä:</td>
                <td>
                  <span className="text-muted">{props.lasku.maksupvm}</span>
                </td>
              </tr>
              <tr>
                <td>Kausi:</td>
                <td>
                  <span className="text-muted">
                    {props.lasku.kausi_alku} - {props.lasku.kausi_loppu}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Viite:</td>
                <td>
                  <span className="text-muted">
                    <span className="text-muted">{props.lasku.viite}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Erittely/Viesti:</td>
                <td>
                  <span
                    className="text-muted"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {props.lasku.erittely}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer text-end">
          <Link to="/menot">
            <button title="" className="btn btn-outline-danger btn-sm">
              <i class="fa-regular fa-circle-xmark"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LaskunTiedotCard;
