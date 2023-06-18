import React, { useState, useEffect } from "react";
import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
import Filter from "./Filter";
import TimeFilter from "./TimeFilter";
import ResponsiveListItem from "./ResponsiveListItem";
import arrow from "../Icons/arrow  down.png";
import { manImpoType, modelImpoType } from "./OurDataTypes";
import Pager from "./Pager";

type Props = {
  productList: ProductData[];
  manImpo: manImpoType[];
  modelImpo: modelImpoType[];
  setTotalPosts: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPeriod: React.Dispatch<React.SetStateAction<number>>;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
  totalPosts: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  period: number;
  sortOrder: number;
  setModelImpo: React.Dispatch<React.SetStateAction<modelImpoType[]>>;

};

const ListContainer = ({ productList, manImpo, modelImpo, setTotalPosts, setCurrentPage,
  setPeriod, setSortOrder, totalPosts, currentPage, period, sortOrder, setTotalPages, totalPages, setModelImpo }: Props) => {
  const [isResponsive, setIsResponsive] = useState(window.outerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.outerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [manList, setManList] = useState<any[]>([]);
  type ModelListType = { [key: number]: { modelId: number; modelName: string }[] };
  const [modelList, setModelList] = useState<ModelListType>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const manResponse = await fetch('https://static.my.ge/myauto/js/mans.json');
      const manData = await manResponse.json();
      setManList(manData);
      console.log(manData, "MANDATA")

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getManNameByManId = (man_id: any) => {
    let foundModel = manImpo.find((man) => man.manId === man_id)
    if (foundModel) {
      return foundModel.manName;
    } else {
      // console.log(manList, "MANLIST")
      let foundModel = manList.find((man: any) => man.man_id == man_id);
      if (foundModel) {
        return foundModel.man_name;
      } else {
        return "Not found";
      }
    }
  };

  const fetchModel = async (man_id: any, model_id: any) => {
    const modelResponse = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`);
    const modelData = await modelResponse.json();
    const foundModel = modelData.data.find((model: any) => model.model_id == model_id);
    if (foundModel) {
      return foundModel;
    } else {
      // Model not found
      console.log('Model not found');
    }
  }
  const getModelByName = (model_id: any, man_id: any): string => {
    const foundModel = modelImpo.find((model) => model.modelId === model_id);
    if (foundModel) {
      return foundModel.modelName;
    } else {
      let lst = manImpo.find(it => it.manId == man_id)?.models
      if (lst) {
        let foundModel = lst.find(it => it.model_id == model_id)
        if (foundModel) {
          return foundModel.model_name
        }
      }

      return ""
    }
  };

  return (
    <div className="list-container">
      <div className="headline">
        <div className="carNumber">{totalPosts} განცხადება</div>
        <TimeFilter setPeriod={setPeriod} />
        <Filter setSortOrder={setSortOrder} />
      </div>
      <div className="list-content">
        {productList && productList.map((item, id) =>
          isResponsive ? (
            <ResponsiveListItem key={id} item={item} />
          ) : (
            <ListItem key={id} item={item} modelName={getModelByName(item.model_id, item.man_id)} manName={getManNameByManId(item.man_id)} />
          )
        )}
        <div className="PagerContainer">
          <Pager currentPage={currentPage} setCurrentPage={setCurrentPage} totalPageCount={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
