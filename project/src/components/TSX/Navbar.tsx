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
  const [valuteState, setValuteState] = useState<boolean>(false);
  const [dropNum, setDropNum] = useState<number>(-1);
  const [garigebaOpen, setGarigebaOpen] = useState<boolean>(false);
  const [mwarmoebeliOpen, setMwarmoebeliOpen] = useState<boolean>(false);
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  const resetAllDropStates = () => {
    setGarigebaOpen(false);
    setMwarmoebeliOpen(false);
    setModelOpen(false);
    setCategoryOpen(false);
  };

  const valuteHandler = () => {
    setValuteState((valuteState) => !valuteState);
  };
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
          <div className="dropdown" onClick={() => setDropNum(1)}>
            <DealType
              drop={garigebaOpen}
              setDrop={setGarigebaOpen}
              resetOthers={resetAllDropStates}
            />
          </div>
        </div>
        <div className="title">მწარმოებელი</div>
        <div className="dropdown" onClick={() => setDropNum(2)}>
          <Manufacturer
            manData={props.manData}
            drop={mwarmoebeliOpen}
            setDrop={setMwarmoebeliOpen}
            resetOthers={resetAllDropStates}
          />
        </div>
        <div className="title">მოდელი</div>
        <div className="dropdown" onClick={() => setDropNum(3)}>
          <Model
            drop={modelOpen}
            setDrop={setModelOpen}
            resetOthers={resetAllDropStates}
          />
        </div>
        <div className="title">კატეგორია</div>
        <div className="dropdown" onClick={() => setDropNum(4)}>
          <Category
            drop={categoryOpen}
            setDrop={setCategoryOpen}
            resetOthers={resetAllDropStates}
          />
        </div>
        <div className="priceInSearch">
          <div className="pricePart">
            <div className="pricePartTitle">ფასი</div>
            <div className="priceSign" onClick={() => valuteHandler()}>
              <div
                className={
                  valuteState ? "priceSignElem signActive" : "priceSignElem"
                }
              >
                ₾
              </div>
              <div
                className={
                  valuteState ? "priceSignElem " : "priceSignElem signActive"
                }
              >
                $
              </div>
            </div>
          </div>
          <div className="priceRange">
            <input type="text" className="range" placeholder="დან"></input>-
            <input type="text" className="range" placeholder="მდე"></input>
          </div>
        </div>
        <button className="search-btn">ძებნა</button>
      </div>
    </div>
  );
};

export default Navbar;
