// Packages
import React from "react";

// Assets
import Sidebar from "./sidebar";

function Home() {
  return (
    <main className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2"></div>
      </div>
    </main>
  );
}

export default Home;
