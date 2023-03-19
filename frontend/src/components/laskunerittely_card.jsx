// Packages
import React from "react";
import { Link } from "react-router-dom";

function LaskunErittelyCard(props) {
  //console.log("kk", props.menoerittely.menoerittely);
  var mn = [];
  mn = props.menoerittely.menoerittely;
  console.log(props);

  //mn.forEach((element) => console.log(element));

  // mn.forEach(function (arrayItem) {
  //   var x = arrayItem.prop1 + 2;
  //   console.log(x);
  // });

  return (
    <div className="col-12 col-md-5 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Laskun erittely</h5>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Laji</th>
                  <th>Summa</th>
                </tr>
              </thead>
              <tbody>
                {/* <td>{props.menoerittely.menoerittely.summa}</td> */}
                <td></td>
              </tbody>
            </table>
          </div>
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

export default LaskunErittelyCard;
