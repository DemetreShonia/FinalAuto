import React, { useState } from "react";
import "../Styles/Navbar.css";
import Carimage from "./Carimage";
import Tractorimage from "./Tractorimage";
import Motoimage from "./Motoimage";
import DealType from "./DealType";
import Manufacturer from "./Manufacturer";
import Category from "./Category";
import Model from "./Model";

import { ManData } from "../../App";
import { CatData } from "../../App";
type Props = {
  manData: ManData[];
  catData: CatData[];
};

const Navbar = (props: Props) => {
  const [vehicleType, setVehicleType] = useState<number>(1);

  console.log(props.catData);
  console.log(props.manData);
  return (
    <div className="navbar">
      <div className="navbar-options">
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
        <div className="title">მწარმოებელი</div>
        <div className="dropdown">
          <Manufacturer manData={props.manData} />
        </div>
        <div className="title">მოდელი</div>
        <div className="dropdown">
          <Model />
        </div>
        <div className="title">კატეგორია</div>
        <div className="dropdown">
          <Category />
        </div>

        <div className="title price">ფასი</div>
        <div className="priceRange"></div>
      </div>
    </div>
  );
};

export default Navbar;
