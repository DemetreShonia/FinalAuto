import React, { useEffect, useState } from "react";
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

export interface FilterInformation {
  forRent: number;
  manufacturers: number[];
  models: number[];
  categories: number[];
  vehicleType: number;
  from: number;
  to: number;
}

const Navbar = () => {
  const [manList, setManList] = useState<ManData[]>([]);
  const [catList, setCatList] = useState<CatData[]>([]);
  const [manDataToUse, setMandataToUse] = useState<ManData[]>();
  const [filterInfo, setFilterInfo] = useState<FilterInformation>({
    forRent: -1,
    manufacturers: [],
    models: [],
    categories: [],
    vehicleType: 0,
    from: -1,
    to: -1,
  });

  const filterManDataByVehicleType = (manData: ManData[], id: number) => {
    switch (id) {
      case 0: // car
        return manData.filter(({ is_car }) => is_car == 1); // not ===
      case 1: // moto
        return manData.filter(({ is_moto }) => is_moto == 1);
      case 2: // spec
        return manData.filter(({ is_spec }) => is_spec == 1);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("https://api2.myauto.ge/ka/cats/get");
    const json = await response.json();
    const manu: CatData[] = json.data;
    const catDatas = manu.map(({ title, category_id, category_type }) => ({
      title,
      category_id,
      category_type,
    }));
    setCatList(catDatas);
  };
  const fetchManufacturers = async () => {
    const response = await fetch("https://static.my.ge/myauto/js/mans.json");
    const json = await response.json();
    const manu: ManData[] = json;

    setManList(manu);
    setMandataToUse(filterManDataByVehicleType(manu, 0));
  };
  const fetchData = async () => {
    try {
      fetchManufacturers();
      fetchCategories();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setForRent = (v: number) => {
    setFilterInfo({ ...filterInfo, forRent: v });
  };
  const setManufacturers = (v: number[]) => {
    setFilterInfo({ ...filterInfo, manufacturers: v });
  };

  const setVehicleTypeID = (v: number) => {
    // this is here
    setFilterInfo({ ...filterInfo, vehicleType: v });
    setMandataToUse(filterManDataByVehicleType(manList, v));
  };

  const setModels = (v: number[]) => {
    setFilterInfo({ ...filterInfo, models: v });
  };
  const setCategories = (v: number[]) => {
    setFilterInfo({ ...filterInfo, categories: v });
  };
  const setFrom = (v: number) => {
    setFilterInfo({ ...filterInfo, from: v });
  };
  const setTo = (v: number) => {
    setFilterInfo({ ...filterInfo, to: v });
  };

  function search() {
    // generate link and stuff
  }
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
          className={
            filterInfo.vehicleType === 0 ? "btn left chosen" : "btn left"
          }
          onClick={() => setVehicleTypeID(0)}
        >
          {filterInfo.vehicleType == 0 ? (
            <Carimage color="#FD4100" />
          ) : (
            <Carimage color="#8C929B" />
          )}
        </button>
        <button
          type="submit"
          className={filterInfo.vehicleType === 1 ? "btn chosen" : "btn"}
          onClick={() => setVehicleTypeID(1)}
        >
          {filterInfo.vehicleType == 1 ? (
            <Tractorimage color="#FD4100" />
          ) : (
            <Tractorimage color="#8C929B" />
          )}
        </button>
        <button
          type="submit"
          className={
            filterInfo.vehicleType === 2 ? "btn right chosen" : "btn right"
          }
          onClick={() => setVehicleTypeID(2)}
        >
          {filterInfo.vehicleType == 2 ? (
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
              setForRent={setForRent}
              drop={garigebaOpen}
              setDrop={setGarigebaOpen}
              resetOthers={resetAllDropStates}
            />
          </div>
        </div>
        <div className="title">მწარმოებელი</div>
        <div className="dropdown" onClick={() => setDropNum(2)}>
          <Manufacturer
            setManufacturers={setManufacturers}
            manData={manDataToUse}
            drop={mwarmoebeliOpen}
            setDrop={setMwarmoebeliOpen}
            resetOthers={resetAllDropStates}
          />
        </div>
        <div className="title">მოდელი</div>
        <div className="dropdown" onClick={() => setDropNum(3)}>
          <Model
            selectedManuIds={filterInfo.manufacturers}
            setModels={setModels}
            drop={modelOpen}
            setDrop={setModelOpen}
            resetOthers={resetAllDropStates}
          />
        </div>
        <div className="title">კატეგორია</div>
        <div className="dropdown" onClick={() => setDropNum(4)}>
          <Category
            vehicleType={filterInfo.vehicleType}
            catList={catList}
            setCategories={setCategories}
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
            <input
              type="number"
              className="range"
              placeholder="დან"
              onChange={(e) => setFrom(+e.target.value)}
            ></input>
            -
            <input
              type="number"
              className="range"
              placeholder="მდე"
              onChange={(e) => setTo(+e.target.value)}
            ></input>
          </div>
        </div>
        <button className="search-btn">ძებნა</button>
      </div>
    </div>
  );
};

export default Navbar;
