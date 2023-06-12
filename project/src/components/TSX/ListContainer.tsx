import React, { useState, useEffect } from "react";
import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
import Filter from "./Filter";
import TimeFilter from "./TimeFilter";
import ResponsiveListItem from "./ResponsiveListItem";

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
      </div>
    </div>
  );
};

export default ListContainer;
