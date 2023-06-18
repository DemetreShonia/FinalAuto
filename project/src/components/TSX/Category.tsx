import React, { ChangeEvent, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { CatData } from "../../App";

type Props = {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  resetOthers: () => void;
  setCategories: (cats: number[]) => void;
  catList: CatData[];
  vehicleType: number;
};

const Category: React.FC<Props> = ({
  drop,
  setDrop,
  resetOthers,
  setCategories,
  catList,
  vehicleType,
}) => {
  const [filteredCats, setFilteredCats] = useState<CatData[]>();
  const [checkedCats, setCheckedCats] = useState<CatData[]>();

  const allCheckedCatTitles =
    checkedCats &&
    checkedCats.map(({ title }) => {
      return title;
    });
  useEffect(() => {
    // selected vehicle type
    const filteredCatData = catList.filter(
      (x) => x.category_type == vehicleType
    );

    setFilteredCats(filteredCatData);
  }, [catList, vehicleType]);

  // const [drop, setDrop] = useState<boolean>(false);

  const handleCheckboxChange = (catData: CatData) => {
    const oldList = checkedCats;

    if (allCheckedCatTitles && allCheckedCatTitles.includes(catData.title)) {
      const newList = oldList
        ? oldList.filter((item) => item.title !== catData.title)
        : checkedCats;
      setCheckedCats(newList);

      const catIds = newList.map(({ category_id }) => {
        return category_id;
      });
      // console.log(catIds)
      setCategories(catIds);
    } else {
      if (oldList) {
        const newList = [...oldList, catData];
        setCheckedCats(newList);
        const catIds = newList.map(({ category_id }) => {
          return category_id;
        });
        setCategories(catIds);
      } else {
        setCheckedCats([catData]);
      }
    }
  };
  const setAllFalse = () => {};
  const getActiveCheckboxStrings = () => {
    if (!allCheckedCatTitles) return "კატეგორია";

    if (allCheckedCatTitles.length >= 1) {
      let res = allCheckedCatTitles.join(", ");
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
        className="Category"
        onClick={() => {
          resetOthers();
          setDrop(!drop);
        }}
      >
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
                {filteredCats &&
                  filteredCats.map((checkbox) => (
                    <div
                      className="checkboxCover"
                      onClick={() => {
                        handleCheckboxChange(checkbox);
                      }}
                      key={checkbox.title}
                    >
                      <div
                        className={
                          allCheckedCatTitles &&
                          allCheckedCatTitles.includes(checkbox.title)
                            ? "checker checkedd"
                            : "checker"
                        }
                      >
                        <BsCheck />
                      </div>
                      <div
                        className={
                          allCheckedCatTitles &&
                          allCheckedCatTitles.includes(checkbox.title)
                            ? "checkbox"
                            : "checkbox"
                        }
                      >
                        {checkbox.title}
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
