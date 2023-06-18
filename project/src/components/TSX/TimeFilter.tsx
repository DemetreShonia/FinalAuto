import { useState } from "react";
import arrow from "../Icons/arrow  down.png";
import "../Styles/TimeFilter.css";

interface props{
  setPeriod: React.Dispatch<React.SetStateAction<number>>;
}

const TimeFilter:React.FC<props> = ({setPeriod}) => {
  const [selected, setSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filterItems = ["1 საათი", "2 საათი", "3 საათი", "1 დღე", "2 დღე","3 დღე","1 კვირა", "2 კვირა","3 კვირა",];

  const onClickedFilterItem = (id: number) => {
    setSelected(id);
    setPeriod(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="TimeFilterCategoty"
        onClick={() => {
          setIsOpen(op => !op);
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
