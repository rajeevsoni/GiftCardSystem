import React from "react";
import "./App.css";

export default function ConsumerDashboard() {
  return (
  <div className="background">
      <h1>Consumer Dashboard</h1>
      <br/>
      <h2>Enter Gift Card Code</h2>
      <br/>
      <input type="text"/>
      <br/>
      <button className="btn btn-primary">Redeem</button>
  </div>
  );
}