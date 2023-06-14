import React, { useState, useEffect } from "react";
import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
import Filter from "./Filter";
import TimeFilter from "./TimeFilter";
import ResponsiveListItem from "./ResponsiveListItem";
import arrow from "../Icons/arrow  down.png"

type Props = {
  productList: ProductData[];
};

const ListContainer = ({ productList }: Props) => {
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

  return (
    <div className="list-container">
      <div className="headline">
        <div className="carNumber">120000 განცხადება</div>
        <TimeFilter />
        <Filter />
      </div>
      <div className="list-content">
        {productList.map((item) =>
          isResponsive ? (
            <ResponsiveListItem item={item} />
          ) : (
            <ListItem item={item} />
          )
        )}
        <div className="pageBar">
          <img src={arrow} className="leftArrow"/>
          <div className="p1"> 1 </div>
          <div className="p2"> 2 </div>
          <div className="p3"> 3 </div>
          <div className="p4"> 4 </div>
          <div className="p5"> 5 </div>
          <img  src={arrow} className="rightArrow"  />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
