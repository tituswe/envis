import "./Card.css";
import { HiFolder } from "react-icons/hi";
import CardRow from "./CardRow";
import { AiOutlinePlus } from "react-icons/ai";

function Card({ cardName, cardDescription, cardFiles }) {
  return (
    <div className="card">
      <div className="directoryRow">
        <HiFolder size={32} className="icon" />
        <h3 className="directoryName">{cardName}</h3>
      </div>
      <h2 className="info">Information</h2>
      <h3 className="lorem">{cardDescription}</h3>

      <div className="cardRows">
        {cardFiles.map((file) => (
          <CardRow key={file} text={file} />
        ))}
      </div>
      <div className="addButton addMargin">
        <AiOutlinePlus size={24} color={"#92929D"} className="iconPlus" />
      </div>
    </div>
  );
}

export default Card;
