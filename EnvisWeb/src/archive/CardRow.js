import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import "./CardRow.css";

function CardRow({ text }) {
  return (
    <div className="cardRow">
      <FaFolderOpen size={24} className="icon" />
      <p className="textRow">{text}</p>
    </div>
  );
}

export default CardRow;
