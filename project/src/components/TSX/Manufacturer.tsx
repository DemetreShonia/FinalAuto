import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import { ManData } from "../../App";

type Props = {
  manData: ManData[];
};

const Manufacturer: React.FC<Props> = ({ manData }) => {
  const [drop, setDrop] = useState<boolean>(false);

  const [checkedManData, setCheckedManData] = useState<string[]>([]);

  const handleCheckboxChange = (name: string) => {
    const oldList = checkedManData;
    if (oldList.includes(name)) {
      const newList = oldList.filter((item) => item !== name);
      setCheckedManData(newList);
    } else {
      const newList = [...oldList, name];
      setCheckedManData(newList);
    }
  };

  const setAllFalse = () => {
    setCheckedManData([]);
  };

  const getActiveCheckboxStrings = () => {
    const activeCheckboxes = checkedManData;
    if (activeCheckboxes.length >= 1) {
      let res = activeCheckboxes.join(", ");
      if (res.length > 18) {
        res = res.slice(0, 18) + "...";
      }
      return res;
    }
  };

  const activeList = getActiveCheckboxStrings();

  return (
    <div className="ManufacturerContainer">
      <div className="Manufacture" onClick={() => setDrop(!drop)}>
        <div className="Manufacturer">
          {activeList ? activeList : "მწარმოებელი"}
        </div>
        <div className={drop ? "arrow rotate" : "arrow"}>
          <IoIosArrowDown />
        </div>
      </div>
      {drop && (
        <div className="DropDown">
          <div className="Options">
            <div className="checkbox-container">
              <div className="checkboxes">
                {manData &&
                  manData.slice(2).map((checkbox) => (
                    <div
                      className="checkboxCover"
                      onClick={() => {
                        handleCheckboxChange(checkbox.man_name);
                      }}
                      key={checkbox.man_name}
                    >
                      <div
                        className={
                          checkedManData.includes(checkbox.man_name)
                            ? "checker checkedd"
                            : "checker"
                        }
                      >
                        <BsCheck />
                      </div>
                      <div
                        className={
                          checkedManData.includes(checkbox.man_name)
                            ? "checkbox"
                            : "checkbox"
                        }
                      >
                        {checkbox.man_name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="emptyFilter">
              <div className="emptyFilter-txt" onClick={() => setAllFalse()}>
                ფილტრის გასუფთავება
              </div>
              <div className="searchBtn" onClick={() => setDrop(false)}>
                არჩევა
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manufacturer;
