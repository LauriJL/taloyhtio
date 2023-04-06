import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from "./components/footer";
import Home from "./components/home";
import Saldo from "./components/home";
import Menot from "./components/menot";
import MenotArkisto from "./components/menot_arkisto";
import MenotArkistoTst from "./components/menot_arkisto_tst";
import MenoLuokat from "./components/menoluokat";
import LaskunTiedot from "./components/laskuntiedot";
import Tulot from "./components/tulot";
import NavBar from "./components/navbar";

function App() {
  return (
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saldo" element={<Saldo />} />
          <Route path="/menot" element={<Menot />} />
          <Route path="/menot_arkisto/:yr" element={<MenotArkisto />} />
          <Route path="/menot_arkisto_tst/:yr" element={<MenotArkistoTst />} />
          <Route exact path="/menot/:id" element={<LaskunTiedot />} />
          <Route path="/menoluokat" element={<MenoLuokat />} />
          <Route path="/tulot" element={<Tulot />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
