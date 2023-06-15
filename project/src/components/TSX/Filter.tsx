import { useState } from "react";
import "../Styles/Filter.css";
import arrow from "../Icons/arrow  down.png";

const Filter = () => {
  const [selected, setSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filterItems = [
    "თარიღი კლებადი",
    "თარიღი ზრდადი",
    "ფასი კლებადი",
    "ფასი ზრდადი",
    "გარბენი კლებადი",
    "გარბენი ზრდადი",
  ];

  const onClickedFilterItem = (id: number) => {
    setSelected(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="filterCategoty"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {selected == -1 ? "გაფილტვრა" : filterItems[selected]}{" "}
        <img src={arrow} />{" "}
      </div>
      <div className={isOpen ? "filter-item-container" : "do-not-show"}>
        {filterItems.map((x, id) => (
          <div
            key={id}
            className="filter-item"
            onClick={() => onClickedFilterItem(id)}
          >
            {x}
          </div>
        ))}
      </div>
    </>
  );
};

export default Filter;
