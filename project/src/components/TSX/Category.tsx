import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Category: React.FC = () => {
  const [drop, setDrop] = useState<boolean>(false);

  return (
    <div className="CategoryContainer">
      <div className="Category" onClick={() => setDrop(!drop)}>
        <div className="Category-t"> კატეგორია </div>
        <div className={drop ? "arrow rotate" : "arrow"}>
          <IoIosArrowDown />
        </div>
      </div>
      {drop && (
        <div className="DropDown">
          <div className="options">
            <div className="checkbox-container">
              <div className="checkboxes">
                <input type="checkbox" />
                <input type="checkbox" />
                <input type="checkbox" />
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
