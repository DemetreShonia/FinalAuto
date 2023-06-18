import React, { useEffect, useState } from "react";
import "../Styles/Navbar.css";
import Carimage from "./Carimage";
import Tractorimage from "./Tractorimage";
import Motoimage from "./Motoimage";
import DealType from "./DealType";
import Manufacturer from "./Manufacturer";
import Category from "./Category";
import Model from "./Model";
import { ProductData } from "../../App";

import { ManData } from "../../App";
import { CatData } from "../../App";
import {
  manImpoType,
  manModel,
  CheckData,
  modelImpoType,
} from "./OurDataTypes";

export interface FilterInformation {
  forRent: number;
  manufacturers: number[];
  models: manModel[];
  categories: number[];
  vehicleType: number;
  from: number;
  to: number;
}

type Props = {
  setLink: (link: string) => void;
  setProductList: (list: ProductData[]) => void;
  setManImpo: (list: manImpoType[]) => void;
  setModelImpo: (list: modelImpoType[]) => void;
  setTotalPosts: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPeriod: React.Dispatch<React.SetStateAction<number>>;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
  totalPosts: number;
  currentPage: number;
  period: number;
  sortOrder: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
};

const Navbar = ({
  setLink,
  setProductList,
  setManImpo,
  setModelImpo,
  setTotalPosts,
  setCurrentPage,
  setPeriod,
  setSortOrder,
  totalPosts,
  currentPage,
  period,
  sortOrder,
  setTotalPages,
  totalPages,
}: Props) => {
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
        return manData.filter(({ is_spec }) => is_spec == 1);
      case 2: // spec
        return manData.filter(({ is_moto }) => is_moto == 1);
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

  const setModels = (v: manModel[]) => {
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

  useEffect(() => {
    console.log(filterInfo);
  }, [filterInfo]);

  useEffect(() => {
    console.log(filterInfo);
  }, [filterInfo]);
  const [checkedManData, setCheckedManData] = useState<CheckData[]>([]);

  useEffect(() => {
    setCurrentPage(1);
    search(1);
  }, [period, sortOrder]);
  useEffect(() => {
    search(currentPage);
  }, [currentPage]);
  useEffect(() => {
    search(1);
  }, []);

  const chosenPer = (num: number) => {
    let nnum = num;
    let sym = "";
    if (nnum > 0 && nnum < 4) {
      console.log("noice");
      sym = "h";
    } else if (nnum >= 4 && nnum < 7) {
      nnum -= 3;
      sym = "d";
    } else if (nnum >= 7) {
      nnum -= 6;
      sym = "w";
    }
    const chosenPerStr = nnum + sym;
    return chosenPerStr;
  };

  function search(currPage: number) {
    let manModelLink = "";
    if (filterInfo.models.length === 0) {
      manModelLink = filterInfo.manufacturers.join("-");
    } else {
      // create a hashmap where you will store manufacturers field man_id as keys and models fields model_id in lists, join by man_id
      var map = new Map<number, Array<number>>();
      for (var i = 0; i < filterInfo.models.length; ++i) {
        if (!map.has(filterInfo.models[i].man_id)) {
          map.set(filterInfo.models[i].man_id, []);
        }
        map
          ?.get(filterInfo.models[i].man_id)
          ?.push(filterInfo.models[i].model_id);
      }

      map.forEach((modelIds, key) => {
        console.log(key, modelIds);
        manModelLink += `${key}.${modelIds.join(".")}` + "-";
      });

      manModelLink = manModelLink.slice(0, -1);

      // convert the map to an array of objects with manufacturer id and list of all its models ids
    }

    let useManIds = [];
    let link = `https://api2.myauto.ge/ka/products/?
      ${filterInfo.forRent == -1 ? "" : "ForRent=" + filterInfo.forRent + "&"}
      ${filterInfo.from == -1 ? "" : "PriceFrom=" + filterInfo.from + "&"}
      ${filterInfo.to == -1 ? "" : "PriceTo=" + filterInfo.to + "&"}
      ${
        filterInfo.categories.length == 0
          ? ""
          : "Cats=" + filterInfo.categories.join(".") + "&"
      }
      ${
        filterInfo.manufacturers.length == 0 ? "" : "Mans=" + manModelLink + "&"
      }`;

    // remove whitespaces from link
    link = link.replace(/\s/g, "");
    let allManList: CheckData[] = manList.map((man) => {
      return { man_name: man.man_name, man_id: man.man_id };
    });
    if (link === "https://api2.myauto.ge/ka/products/?") {
      // console.log(manList, "MANLIST")
      useManIds = manList.map((man) => man.man_id);

      const concIds = manList.map((man) => man.man_id).join("-");
      link = "https://api2.myauto.ge/ka/products/?Mans=" + concIds + "&";
    }
    link =
      link +
      `${sortOrder != -1 ? "SortOrder=" + (sortOrder + 1) + "&" : ""}
    ${period != -1 ? "Period=" + chosenPer(period + 1) : ""}` +
      `&Page=${currPage}`;

    console.log(link);
    // console.log(filterInfo.categories,"Categories");

    const getManImpos = async () => {
      let manImpos = null;
      if (useManIds.length === 0) {
        manImpos = await Promise.all(
          checkedManData.map(async (man) => {
            const modelResponse = await fetch(
              `https://api2.myauto.ge/ka/getManModels?man_id=${man.man_id}`
            );
            const modelJson = await modelResponse.json();
            console.log(modelJson.data);

            return {
              manName: man.man_name,
              manId: man.man_id,
              models: modelJson.data,
            };
          })
        );
      } else {
        manImpos = await Promise.all(
          allManList.map(async (man) => {
            const modelResponse = await fetch(
              `https://api2.myauto.ge/ka/getManModels?man_id=${man.man_id}`
            );
            const modelJson = await modelResponse.json();
            // console.log(modelJson.data);

            return {
              manName: man.man_name,
              manId: man.man_id,
              models: modelJson.data,
            };
          })
        );
      }

      return manImpos;
    };

    getManImpos().then((manImpos) => {
      setManImpo(manImpos);
    });

    const fetchProductList = async () => {
      const response = await fetch(link);
      const json = await response.json();
      // get meta
      const meta = json.data.meta;
      console.log(meta, "METADATA");
      console.log(meta.total);
      setTotalPosts(meta.total);
      setTotalPages(meta.last_page);

      const productList: ProductData[] = json.data.items;
      console.log(productList);
      const filteredProductList = productList.map(
        ({
          for_rent,
          category_id,
          model_id,
          car_model,
          man_id,
          photo,
          photo_ver,
          prod_year,
          car_run_km,
          engine_volume,
          car_id,
          customs_passed,
          drive_type_id,
          price,
          pcide_usd,
          order_date,
          views,
          right_wheel,
        }) => {
          // fetch manufacturer name

          return {
            for_rent,
            category_id,
            model_id,
            car_model,
            man_id,
            photo,
            photo_ver,
            prod_year,
            car_run_km,
            engine_volume,
            car_id,
            customs_passed,
            drive_type_id,
            price,
            pcide_usd,
            order_date,
            views,
            right_wheel,
          };
        }
      );

      setProductList(filteredProductList);
      setLink(link);
    };

    fetchProductList();
    // we have also filterInfo.models of selected!! But DAVIGALEEEEE, mteli dgea kompiutertan vzivar
    // vinme ketili dagvexmareba imedia, torem agar shemidzlia

    // generate link and stuff
    // console.log(link);
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
            checkedManData={checkedManData}
            setCheckedManData={setCheckedManData}
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
            setModelImpo={setModelImpo}
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
        <button className="search-btn" onClick={() => search(1)}>
          ძებნა
        </button>
      </div>
    </div>
  );
};

export default Navbar;
