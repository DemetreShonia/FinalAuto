import React, { useState } from "react";
import "./Navbar.css";
import Carimage from "./Carimage";
import Tractorimage from "./Tractorimage";
import Motoimage from "./Motoimage";
import DealType from "./DealType";

const Navbar: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<number>(1);

  return (
    <div className="navbar">
      <div className="options">
        <button
          type="submit"
          className={vehicleType === 1 ? "btn left chosen" : "btn left"}
          onClick={() => setVehicleType(1)}
        >
          {vehicleType == 1 ? (
            <Carimage color="#FD4100" />
          ) : (
            <Carimage color="#8C929B" />
          )}
        </button>
        <button
          type="submit"
          className={vehicleType === 2 ? "btn chosen" : "btn"}
          onClick={() => setVehicleType(2)}
        >
          {vehicleType == 2 ? (
            <Tractorimage color="#FD4100" />
          ) : (
            <Tractorimage color="#8C929B" />
          )}
        </button>
        <button
          type="submit"
          className={vehicleType === 3 ? "btn right chosen" : "btn right"}
          onClick={() => setVehicleType(3)}
        >
          {vehicleType == 3 ? (
            <Motoimage color="#FD4100" />
          ) : (
            <Motoimage color="#8C929B" />
          )}
        </button>
      </div>
      <div className="dropdowns">
        <div className="title">გარიგების ტიპი</div>
        <div className="deal_type">
          <div className="dropdown">
            <DealType />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
