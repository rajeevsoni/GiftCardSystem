import React, { useState }  from "react";
import "./App.css";

export default function ConsumerDashboard() {
  const [status, setStatus] = useState("Redeem Gift Card");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Redeeming...");
    const { cardCode } = e.target.elements;
    let details = {
      giftCardCode: cardCode.value
    };
    try
    {
    let response = await fetch("http://localhost:5220/GiftCards/redeem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });

    if(response.status === 202)
    {
      alert("Gift Card successfully redeemed");
    }
    else if(response.status === 400)
    {
      alert("Gift Card Code is InValid.");
    }

    }
    catch(e){
      console.log('Request Error:', e);   
      alert("An Error occured while Redeeming Gift Card");     
    }
    finally{
      setStatus("Redeem Gift Card");
    }
  };

  return(
    <form className="background" onSubmit={handleSubmit}>
      <h1>Consumer Dashboard</h1>
      <h2 className="label">Enter Gift Card Code</h2>
      <input className ="input" id="cardCode" type="text" required />
      <br/>
      <button className="btn btn-primary" type="submit">{status}</button>
      <br/>
    </form>
  );
}