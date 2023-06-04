import ListItem from "./components/ListItem";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./App.css";
import Head from "./components/Head";
import ListContainer from "./components/ListContainer";

export interface ProductData {
  car_model: string;
  model_id: number;
  category_id: number;
  for_rent: boolean;
  man_id: number;
  photo: string;
  photo_ver: number;
  prod_year: number;
  car_run_km: number;
  engine_volume: number;
  car_id: number;
  customs_passed: boolean;
  drive_type_id: number;
  price: number;
  pcide_usd: number;
  order_date: string;
  views: number;
  right_wheel: boolean;
}

function App() {
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api2.myauto.ge/ka/products/");
      const json = await response.json();

      const productList: ProductData[] = json.data.items;
      const filteredProductList = productList.map(
        ({
          for_rent,
          category_id,
          model_id,
          car_model,
          man_id,
          photo,
          photo_ver,
          prod_year,
          car_run_km,
          engine_volume,
          car_id,
          customs_passed,
          drive_type_id,
          price,
          pcide_usd,
          order_date,
          views,
          right_wheel,
        }) => ({
          for_rent,
          category_id,
          model_id,
          car_model,
          man_id,
          photo,
          photo_ver,
          prod_year,
          car_run_km,
          engine_volume,
          car_id,
          customs_passed,
          drive_type_id,
          price,
          pcide_usd,
          order_date,
          views,
          right_wheel,
        })
      );
      // console.log(json.data.items);

      setProductList(filteredProductList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };


  return (
    <>
    <Head></Head>
    <div className="content">
      <Navbar></Navbar>
      <ListContainer productList={productList} />
    </div>
    </>
  );
}

export default App;
