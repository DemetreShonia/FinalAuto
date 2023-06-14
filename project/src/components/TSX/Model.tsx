import React, { ChangeEvent, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

interface CheckboxState {
  მოდელი1: boolean;
  მოდელი2: boolean;
  მოდელი3: boolean;
  მოდელი4: boolean;
  მოდელი5: boolean;
}

type Props = {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  resetOthers: () => void;
};

const Model: React.FC<Props> = ({ drop, setDrop, resetOthers }) => {
  //   const [drop, setDrop] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    მოდელი1: false,
    მოდელი2: false,
    მოდელი3: false,
    მოდელი4: false,
    მოდელი5: false,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const setAllFalse = () => {
    setCheckboxes({
      მოდელი1: false,
      მოდელი2: false,
      მოდელი3: false,
      მოდელი4: false,
      მოდელი5: false,
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
    return "";
  };

  const getActiveCheckboxes = () => {
    const activeCheckboxes = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name);
    return activeCheckboxes;
  };
  const activeList = getActiveCheckboxStrings();

  return (
    <div className="ModelContainer">
      <div
        className="Model"
        onClick={() => {
          resetOthers();
          setDrop(!drop);
        }}
      >
        <div className="Model-t">{activeList ? activeList : "მოდელი"}</div>
        <div className={drop ? "arrow rotate" : "arrow"}>
          <IoIosArrowDown />
        </div>
      </div>
      {drop && (
        <div className="DropDown">
          <div className="Modeloptions">
            <div className="checkbox-container">
              <div className="Modelcheckboxes">
                {Object.entries(checkboxes).map(([name, checked]) => (
                  <div className="checkboxCover" key={name}>
                    <div
                      className={checked ? "checker checkedd" : "checker"}
                      onClick={() =>
                        handleCheckboxChange({
                          target: { name, checked: !checked },
                        })
                      }
                    >
                      <BsCheck />
                    </div>
                    <div className={checked ? "checkbox checked!" : "checkbox"}>
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
        </div>
      )}
    </div>
  );
};

export default Model;
