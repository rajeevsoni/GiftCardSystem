import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
          <div className="logo">Gift Card App</div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/admindashboard">AdminDashboard</Link>
              <Link to="/consumerdashboard">ConsumerDashboard</Link>
           </ul>
        </div>
  );
}