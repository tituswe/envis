import React from "react";
import "./AddCard.css";
import { AiOutlinePlus } from "react-icons/ai";

function AddCard() {
  return (
    <div className="addCard">
      <div className="textCard">Create a New Directory</div>
      <div className="addButton addmargin">
        <AiOutlinePlus size={24} color={"#92929D"} className="iconPlus" />
      </div>
    </div>
  );
}

export default AddCard;
