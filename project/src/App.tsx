import { useEffect, useState } from "react";

interface Data {
  man_id: number;
  man_name: string;
  is_car: number;
  is_spec: number;
  is_moto: number;
}

function App() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://static.my.ge/myauto/js/mans.json");
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return <>zdd</>;
}

export default App;
