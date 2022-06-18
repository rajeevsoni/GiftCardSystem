import React, { useState, useEffect } from "react";
import "./App.css";

export default function AdminDashboard() {
  const [status, setStatus] = useState("Create Gift Card");
  const [hasError, setErrors] = useState(false);
  const [giftCards, setGiftCards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Creating...");
    const { cardvalue } = e.target.elements;
    let details = {
      giftCardValue: cardvalue.value
    };
    try
    {
    let response = await fetch("http://localhost:5220/GiftCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });

    if(response.status === 201)
    {
      alert("Gift Card creadted successfully");
    }
    else
    {
      alert("Something went wrong.");
    }

    }
    catch(e){
      console.log('Request Error:', e);   
      alert("An Error occured while creating gift card");     
    }
    finally{
      setStatus("Create Gift Card");
    }
  };

  async function fetchData() {
    const res = await fetch("http://localhost:5220/GiftCards");
    res
      .json()
      .then(res => setGiftCards(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  return(
    <form className="background" onSubmit={handleSubmit}>
      <h1>Admin Dashboard</h1>
      <h2 className="label">Enter value for Gift Card (in dollars) </h2>
      <input className ="input" id="cardvalue" type="number" min="0" max="500" required />
      <br/>
      <button className="btn btn-primary" type="submit">{status}</button>
      <br/>
      <h2 className="label">Current Gift Cards in System</h2>  
      <br/>
      {hasError ? <h3>Some error while fetching Gift Cards</h3> : <br/>}
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>GiftCard Code</th>
            <th>Gift Card Value(in $)</th>
            <th>Expire Date</th>
            <th>IsConsumed</th>
          </tr>
        </thead>
        <tbody>
          {giftCards.map(giftCard =>
            <tr key={giftCard.code}>
              <td>{giftCard.code}</td>
              <td>{giftCard.value}</td>
              <td>{new Date(giftCard.expireOn).toLocaleDateString()}</td>
              <td>{giftCard.isConsumed.toString()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
}