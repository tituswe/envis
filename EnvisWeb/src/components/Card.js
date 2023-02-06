import "./Card.css";
import { HiFolder } from "react-icons/hi";
import CardRow from "./CardRow";

function Card() {
  return (
    <div className="card">
      <div className="directoryRow">
        <HiFolder size={32} className="icon" />
        <h3 className="directoryName">Directory</h3>
      </div>
      <h2 className="info">Information</h2>
      <h3 className="lorem">Folder to share information about the bus stop</h3>

      <div className="cardRows">
        <CardRow text={"Hehexd"} />
        <CardRow text={"Another File"} />
        <CardRow text={"sHIT"} />
      </div>
    </div>
  );
}

export default Card;
