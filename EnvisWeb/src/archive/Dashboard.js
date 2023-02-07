import React from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import "./Dashboard.css";

const Dashboard = () => {
  const cardData = {
    card1: {
      cardName: "Card Name",
      cardDescription: "Card Description",
      cardFiles: ["heheXd", "Random file", "testing"],
    },
    card2: {
      cardName: "Card Name2",
      cardDescription: "Card Description2",
      cardFiles: ["file1", "file2", "file3"],
    },
  };

  return (
    <div>
      <h2 className="dashboardText">Dashboard</h2>

      <div className="dashboard">
        {Object.values(cardData).map((cards) => {
          console.log(cards);
          return (
            <Card
              key={cards.cardName}
              cardName={cards.cardName}
              cardDescription={cards.cardDescription}
              cardFiles={cards.cardFiles}
            />
          );
        })}
        <AddCard/>
      </div>
    </div>
  );
};

export default Dashboard;
