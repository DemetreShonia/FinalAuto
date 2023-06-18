import { useState } from "react";
import "../Styles/Filter.css";
import arrow from "../Icons/arrow  down.png";
interface props{
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
}

const Filter:React.FC<props> = ({setSortOrder}) => {
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
    setSortOrder(id);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="filterCategoty"
        onClick={() => {
          setIsOpen(op => !op);
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
