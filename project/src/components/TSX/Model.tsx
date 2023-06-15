import React, { ChangeEvent, useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  resetOthers: () => void;
  setModels: (models: number[]) => void;
  selectedManuIds: number[];
};

interface ModelData {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: number;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
}
type FilteredModels = {
  model_name: string;
  model_id: number;
};

// is car stuff? not yet...

const Model: React.FC<Props> = ({
  drop,
  setDrop,
  resetOthers,
  setModels,
  selectedManuIds,
}) => {
  const [filteredModels, setFilteredModels] = useState<FilteredModels[]>();
  const [checkedModels, setChosenModels] = useState<string[]>([]);
  const allModelNames =
    filteredModels &&
    filteredModels.map(({ model_name, model_id }) => {
      return model_name;
    });

  console.log(allModelNames);
  console.log(filteredModels);
  const fetchModel = async (man_id: number) => {
    const response = await fetch(
      `https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`
    );
    const json = await response.json();

    const modelList: ModelData[] = json.data;
    const filtered = modelList.map(({ model_name, model_id }) => ({
      model_name,
      model_id,
    }));
    return filtered;
  };
  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < selectedManuIds.length; i++) {
        const innerModel: FilteredModels[] = await fetchModel(
          selectedManuIds[i]
        );
        setFilteredModels(innerModel);
        break;
      }
    };

    fetchData();
  }, [selectedManuIds]);

  const handleCheckboxChange = (filterData: FilteredModels) => {
    const oldList = checkedModels;
    console.log(checkedModels);

    if (checkedModels && checkedModels.includes(filterData.model_name)) {
      const newList = oldList
        ? oldList.filter((item) => item !== filterData.model_name)
        : checkedModels;
      setChosenModels(newList);
    } else {
      if (oldList) {
        const newList = [...oldList, filterData.model_name];
        setChosenModels(newList);
      }
    }
  };

  const getActiveCheckboxStrings = () => {
    if (!checkedModels) return "მოდელი";

    if (checkedModels.length >= 1) {
      let res = checkedModels.join(", ");
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
        className="Model"
        onClick={() => {
          if (filteredModels && filteredModels.length > 0) {
            resetOthers();
            setDrop(!drop);
          }
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
                {filteredModels &&
                  filteredModels.map((checkbox) => (
                    <div
                      className="checkboxCover"
                      onClick={() => {
                        console.log(checkbox.model_name);
                        handleCheckboxChange(checkbox);
                      }}
                      key={checkbox.model_name}
                    >
                      <div
                        className={
                          checkedModels &&
                          checkedModels.includes(checkbox.model_name)
                            ? "checker checkedd"
                            : "checker"
                        }
                      >
                        <BsCheck />
                      </div>
                      <div
                        className={
                          checkedModels &&
                          checkedModels.includes(checkbox.model_name)
                            ? "checkbox"
                            : "checkbox"
                        }
                      >
                        {checkbox.model_name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="emptyFilter">
              <div
                className="emptyFilter-txt"
                onClick={() => {
                  /* set all false */
                }}
              >
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
