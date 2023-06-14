import React, { ChangeEvent, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

interface CheckboxState {
  კატეგორია1: boolean;
  კატეგორია2: boolean;
  კატეგორია3: boolean;
  კატეგორია4: boolean;
}

const Category: React.FC = () => {
  const [drop, setDrop] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    კატეგორია1: false,
    კატეგორია2: false,
    კატეგორია3: false,
    კატეგორია4: false,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const setAllFalse = () => {
    setCheckboxes({
      კატეგორია1: false,
      კატეგორია2: false,
      კატეგორია3: false,
      კატეგორია4: false,
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
    <div className="CategoryContainer">
      <div className="Category" onClick={() => setDrop(!drop)}>
        <div className="Category-t">
          {activeList ? activeList : "კატეგორია"}
        </div>
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
                  <div className="checkboxCover">
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
        </div>
      )}
    </div>
  );
};

export default Category;
