import React, { ChangeEvent, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import { ManData } from "../../App";

type Props = {
  manData: ManData[];
};

interface CheckboxState {
  item: ManData;
  showModal: boolean;
}

const Manufacturer: React.FC<Props> = ({ manData }) => {
  console.log(manData);
  const [drop, setDrop] = useState<boolean>(false);

  const [checkboxes, setCheckboxes] = useState<CheckboxState[]>(() =>
    manData.map((item) => ({
      item,
      showModal: false,
    }))
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.item.man_name === name
          ? { ...checkbox, showModal: checked }
          : checkbox
      )
    );
  };

  const setAllFalse = () => {
    setCheckboxes(
      manData.map((item) => ({
        item,
        showModal: false,
      }))
    );
  };

  const getActiveCheckboxStrings = () => {
    const activeCheckboxes = checkboxes
      .filter((checkbox) => checkbox.showModal)
      .map((checkbox) => checkbox.item.man_name);
    if (activeCheckboxes.length >= 1) {
      let res = activeCheckboxes.join(", ");
      if (res.length > 18) {
        res = res.slice(0, 18) + "...";
      }
      return res;
    }
  };

  const getActiveCheckboxes = () => {
    const activeCheckboxes = checkboxes
      .filter((checkbox) => checkbox.showModal)
      .map((checkbox) => checkbox.item.man_name);
    return activeCheckboxes;
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
        <div className="Manufacture-DropDown">
          <div className="Manufacture-Options">
            <div className="checkbox-container">
            <div className="checkboxes">
            {checkboxes
              .slice(2)
              .map((checkbox) => (
                <div
                  className="checkboxCover"
                  onClick={() =>
                    handleCheckboxChange({
                      target: { name: checkbox.item.man_name, checked: !checkbox.showModal },
                    } as ChangeEvent<HTMLInputElement>)
                  }
                  key={checkbox.item.man_name}
                >
                  <div className={checkbox.showModal ? "checker checkered" : "checker"}>
                    <BsCheck />
                  </div>
                  <div className={checkbox.showModal ? "checkbox checked" : "checkbox"}>
                    {checkbox.item.man_name}
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
