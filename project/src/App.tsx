import { useEffect, useState } from "react";
import "./App.css";
import TextLine from "./components/TSX/TextLine";
import ListContainer from "./components/TSX/ListContainer";
import Head from "./components/TSX/Head";
import Navbar from "./components/TSX/Navbar";

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

export interface ManData {
  man_name: string;
}

export interface CatData {
  title: string;
}

function App() {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [manList, setManList] = useState<ManData[]>([]);
  const [catList, setCatList] = useState<CatData[]>([]);
  const [isResponsive, setIsResponsive] = useState(window.outerWidth <= 550);

  useEffect(() => {
    fetchData();

    const handleResize = () => {
      setIsResponsive(window.outerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("https://api2.myauto.ge/ka/cats/get");
    const json = await response.json();
    const manu: CatData[] = json.data;
    const filteredManus = manu.map(({ title }) => ({
      title,
    }));
    setCatList(filteredManus);
  };

  const fetchManufacturers = async () => {
    const response = await fetch("https://static.my.ge/myauto/js/mans.json");
    const json = await response.json();
    const manu: ManData[] = json;
    const filteredManus = manu.map(({ man_name }) => ({
      man_name,
    }));
    setManList(filteredManus);
  };

  const fetchProductList = async () => {
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
    setProductList(filteredProductList);
  };

  const fetchData = async () => {
    try {
      fetchProductList();
      fetchManufacturers();
      fetchCategories();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <Head></Head>
      {!isResponsive && <TextLine />}
      <div className="content">
        <Navbar manData={manList} catData={catList} />
        <ListContainer productList={productList} />
      </div>
    </>
  );
}

export default App;
