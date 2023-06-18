import { useEffect, useState } from "react";
import "./App.css";
import TextLine from "./components/TSX/TextLine";
import ListContainer from "./components/TSX/ListContainer";
import Head from "./components/TSX/Head";
import Navbar from "./components/TSX/Navbar";
import { manImpoType, modelImpoType } from "./components/TSX/OurDataTypes";

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
  man_id: number;
  is_car: number;
  is_spec: number;
  is_moto: number;
}

export interface CatData {
  title: string;
  category_id: number;
  category_type: number;
}

function App() {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [currentFilteredLink, setCurrentFilteredLink] = useState<string>();
  const [manImpo, setManImpo] = useState<manImpoType[]>([]);
  const [modelImpo, setModelImpo] = useState<modelImpoType[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [period, setPeriod] = useState<number>(-1);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  // this can be used to add + SORT ORDER STUFF

  const [isResponsive, setIsResponsive] = useState(window.outerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.outerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(period, sortOrder)
  }, [period,sortOrder]);


  return (
    <>
      <Head></Head>
      {!isResponsive && <TextLine />}
      <div className="content">
        <Navbar
          setProductList={setProductList}
          setLink={setCurrentFilteredLink}
          setManImpo={setManImpo}
          setModelImpo={setModelImpo}
          setTotalPosts={setTotalPosts}
          setCurrentPage={setCurrentPage}
          setPeriod={setPeriod}
          setSortOrder={setSortOrder}
          totalPosts={totalPosts}
          currentPage={currentPage}
          period={period}
          sortOrder={sortOrder}
          totalPages={totalPages}
          setTotalPages={setTotalPages}

        />
        <ListContainer productList={productList} manImpo={manImpo} modelImpo={modelImpo}
          setTotalPosts={setTotalPosts}
          setCurrentPage={setCurrentPage}
          setPeriod={setPeriod}
          setSortOrder={setSortOrder}
          totalPosts={totalPosts}
          currentPage={currentPage}
          period={period}
          sortOrder={sortOrder}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          setModelImpo={setModelImpo} />

      </div>
    </>
  );
}

export default App;
