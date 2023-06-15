import { useState } from "react";
import arrow from "../Icons/arrow  down.png";
import "../Styles/TimeFilter.css";

const TimeFilter = () => {
  const [selected, setSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filterItems = ["1 საათი", "3 საათი", "6 საათი", "12 საათი", "24 საათი"];

  const onClickedFilterItem = (id: number) => {
    setSelected(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="TimeFilterCategoty"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {selected == -1 ? "პერიოდი" : filterItems[selected]}{" "}
        <img src={arrow} className="arrow" />{" "}
      </div>
      <div className={isOpen ? "TimeFilter-item-container" : "do-not-show"}>
        {filterItems.map((x, id) => (
          <div
            key={id}
            className="filter-item"
            onClick={() => {
              onClickedFilterItem(id);
            }}
          >
            {x}
          </div>
        ))}
      </div>
    </>
  );
};

export default TimeFilter;
