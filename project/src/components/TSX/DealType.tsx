import React, { ChangeEvent, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
interface CheckboxState {
  იყიდება: boolean;
  ქირავდება: boolean;
  დღიურად: boolean;
  მძღოლით: boolean;
  შესყიდვით: boolean;
  დაზღვეული: boolean;
}
interface props {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  resetOthers: () => void;
}
const DealType: React.FC<props> = ({ drop, setDrop, resetOthers }) => {
  // const [drop, setDrop] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    იყიდება: false,
    ქირავდება: false,
    დღიურად: false,
    მძღოლით: false,
    შესყიდვით: false,
    დაზღვეული: false,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "ქირავდება" && !checked) {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        დღიურად: false,
        მძღოლით: false,
        შესყიდვით: false,
        დაზღვეული: false,
      });
    } else if (
      (name === "დღიურად" ||
        name === "მძღოლით" ||
        name === "შესყიდვით" ||
        name === "შესყიდვით" ||
        name === "დაზღვეული") &&
      checked
    ) {
      setCheckboxes({ ...checkboxes, [name]: checked, ["ქირავდება"]: checked });
    } else {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
  };

  // create function to set all checkboxes to false
  const setAllFalse = () => {
    setCheckboxes({
      იყიდება: false,
      ქირავდება: false,
      დღიურად: false,
      მძღოლით: false,
      შესყიდვით: false,
      დაზღვეული: false,
    });
  };

  const getActiveCheckboxStrings = () => {
    const activeCheckboxes = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name);
    // make string out of activeCheckboxes
    if (activeCheckboxes.length >= 1) {
      let res = activeCheckboxes.join(", ");
      // if res is too long, cut it and add '...'
      if (res.length > 18) {
        res = res.slice(0, 18) + "...";
      }
      return res;
    }
  };

  const getActiveCheckboxes = () => {
    const activeCheckboxes = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name);
    return activeCheckboxes;
  };

  const activeList = getActiveCheckboxStrings();
  return (
    <div className="DealTypeContainer">
      <div
        className="DealType"
        onClick={() => {
          resetOthers();
          setDrop(!drop);
        }}
      >
        <div className="DealType-t">
          {activeList ? activeList : "გარიგების ტიპი"}
        </div>
        <div className={drop ? "arrow rotate" : "arrow"}>
          <IoIosArrowDown />
        </div>
      </div>
      {drop && (
        <div className="DropDown">
          <div className="options">
            {/* Separate first two checkboxes */}
            <div
              className="checkboxCover"
              onClick={() =>
                handleCheckboxChange({
                  target: { name: "იყიდება", checked: !checkboxes.იყიდება },
                } as ChangeEvent<HTMLInputElement>)
              }
            >
              <div
                className={checkboxes.იყიდება ? "checker checkedd" : "checker"}
              >
                <BsCheck />
              </div>
              <div
                key="იყიდება"
                className={
                  checkboxes.იყიდება ? "checkbox checked!" : "checkbox"
                }
              >
                იყიდება
              </div>
            </div>
            <div
              className="checkboxCover"
              onClick={() =>
                handleCheckboxChange({
                  target: { name: "ქირავდება", checked: !checkboxes.ქირავდება },
                } as ChangeEvent<HTMLInputElement>)
              }
            >
              <div
                className={
                  checkboxes.ქირავდება ? "checker checkedd" : "checker"
                }
              >
                <BsCheck />
              </div>
              <div
                key="ქირავდება"
                className={
                  checkboxes.ქირავდება ? "checkbox checked!" : "checkbox"
                }
              >
                ქირავდება
              </div>
            </div>
            <div className="checkboxesInside">
              {/* Remaining checkboxes */}
              {Object.entries(checkboxes)
                .slice(2)
                .map(([name, checked]) => (
                  <div
                    className="checkboxCover"
                    onClick={() =>
                      handleCheckboxChange({
                        target: { name, checked: !checked },
                      } as ChangeEvent<HTMLInputElement>)
                    }
                  >
                    <div className={checked ? "checker checkedd" : "checker"}>
                      <BsCheck />
                    </div>
                    <div
                      key={name}
                      className={checked ? "checkbox checked!" : "checkbox"}
                    >
                      {name}
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
      )}
    </div>
  );
};

export default DealType;
