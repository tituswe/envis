import React from "react";
import Card from "./Card";
import "./Dashboard.css";
import AddCard from "./AddCard";

function Dashboard() {
  return (
    <div>
      <h2 className="dashboardText">Dashboard</h2>
      <div className="dashboard">
        <Card />
        <Card />
        <Card />
        <AddCard />
      </div>
    </div>
  );
}

export default Dashboard;
