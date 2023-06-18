import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import { ManData } from "../../App";
import { CheckData } from "./OurDataTypes";

type Props = {
  manData: ManData[] | undefined;
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  resetOthers: () => void;
  setManufacturers: (manufacturers: number[]) => void;
  checkedManData: CheckData[];
  setCheckedManData: React.Dispatch<React.SetStateAction<CheckData[]>>;
};

const Manufacturer: React.FC<Props> = ({
  manData,
  drop,
  setDrop,
  resetOthers,
  setManufacturers,
  checkedManData,
  setCheckedManData,
  
}) => {
  // const [drop, setDrop] = useState<boolean>(false);

  // const [checkedManData, setCheckedManData] = useState<CheckData[]>([]);

  const activeCheckboxes = checkedManData.map(({ man_name }) => {
    return man_name;
  });

  useEffect(() => {
    const manuIds = checkedManData.map(({ man_id }) => {
      return +man_id;
    });
    setManufacturers(manuIds);
    console.log(checkedManData)
  }, [checkedManData]);

  const handleCheckboxChange = (checkData: CheckData) => {
    const oldList = checkedManData;
 
    if (activeCheckboxes.includes(checkData.man_name)) {
      const newList = oldList.filter(
        (item) => item.man_name !== checkData.man_name
      );
      setCheckedManData(newList);
    } else {
      const newList = [...oldList, checkData];
      setCheckedManData(newList);
    }
  };

  const setAllFalse = () => {
    setCheckedManData([]);
  };

  const getActiveCheckboxStrings = () => {
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
    <div className="ModelContainer">
      <div
        className="Manufacture"
        onClick={() => {
          resetOthers();
          setDrop(!drop);
        }}
      >
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
                        handleCheckboxChange({
                          man_id: checkbox.man_id,
                          man_name: checkbox.man_name,
                        });
                      }}
                      key={checkbox.man_name}
                    >
                      <div
                        className={
                          activeCheckboxes.includes(checkbox.man_name)
                            ? "checker checkedd"
                            : "checker"
                        }
                      >
                        <BsCheck />
                      </div>
                      <div
                        className={
                          activeCheckboxes.includes(checkbox.man_name)
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
