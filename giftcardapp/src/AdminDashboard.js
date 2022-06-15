import React from "react";
import "./App.css";

export default function AdminDashboard() {
  return(
  <div className="background">
      <h1>Admin Dashboard</h1>
      <br/>
      <h2>Enter value for Gift Card (in dollars)</h2>
      <br/>
      <input type="text"/>
      <br/>
      <button className="btn btn-primary">Create Gift Card</button>
  </div>
  );
}