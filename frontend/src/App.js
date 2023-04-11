import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from "./components/footer";
import Home from "./components/home";
import Saldo from "./components/home";
import Menot from "./components/menot";
import Arkisto from "./components/arkisto";
import MenoLuokat from "./components/menoluokat";
import LaskunTiedot from "./components/laskuntiedot";
import Tulot from "./components/tulot";
import NavBar from "./components/navbar";
import TulotModule from "./components/tulot_module";
import MenotModule from "./components/menot_module";

function App() {
  return (
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saldo" element={<Saldo />} />
          <Route path="/menot" element={<Menot />} />
          <Route path="/arkisto/:yr" element={<Arkisto />} />
          <Route exact path="/menot/:id" element={<LaskunTiedot />} />
          <Route path="/menoluokat" element={<MenoLuokat />} />
          <Route path="/tulot" element={<Tulot />} />
          <Route path="/tulot_module" element={<TulotModule />} />
          <Route path="/menot_module" element={<MenotModule />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
