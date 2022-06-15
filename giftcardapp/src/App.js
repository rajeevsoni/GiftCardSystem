import logo from './giftcardicon.svg';
import './App.css';
import React from "react";
import AdminDashboard from "./AdminDashboard";
import ConsumerDashboard from "./ConsumerDashboard";
import Nav from "./Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes >
          <Route path="/" element={<Home/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/consumerdashboard" element={<ConsumerDashboard/>} />
        </Routes >
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Gift Card App
        </h2>
        <br/><br/>
        <p className="paragraph">
          This is a simple gift card management system App developed on .Net Core, RedisJSON and ReactJs.
          Similar to Amamzon gift card system, here admin caa gerenrate gift cards from the admin dashboard.
          And Consumer can redeem gift card from Consumer Dashboard.
          
        </p>
      </header>
    </div>
  );
}
