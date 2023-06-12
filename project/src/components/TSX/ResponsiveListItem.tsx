import "../Styles/ResponsiveListItem.css";
import doneIcon from "../Icons/done-path.png"
import hot from "../Icons/hot.png"
import GeoFlag from "../Icons/geoFlag.png"


import { ProductData } from "../../App";
type Props = {
  item: ProductData;
};

const ResponsiveListItem = ({ item }: Props) => {
  function calculateTimePassed(ts: string): {
    hours: number;
    days: number;
    years: number;
  } {
    const currentDate = new Date();
    const providedDate = new Date(ts);

    const timePassed = currentDate.getTime() - providedDate.getTime();

    const hoursPassed = Math.floor(timePassed / (1000 * 60 * 60));
    const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));
    const yearsPassed = currentDate.getFullYear() - providedDate.getFullYear();

    return { hours: hoursPassed, days: daysPassed, years: yearsPassed };
  }

  console.log(item.car_id);
  const img = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;

  return (
    <div className="ResponsiveListItem">
      <div className="Rhead"> 
      <div className="Rline1"> <div className="nam"> LAND ROVER Range Rover Evoque  </div> <div className="Ryear">{item.prod_year}</div></div>
      <div className="Rline2">
        <div className="price">
        <div className="priceVal">
              {" "} {Math.round(item.price / 1000) + "," + (item.price % 1000)}{" "}
        </div>{" "}
        <div className="priceIcon">₾</div>
        <div className="checked"> <img src={doneIcon} alt="" /> განბაჟებული</div></div>
        </div>
     
      </div>
      <img src={img} className="Rphoto" />
      <div className="ResponsiveInfo">
        <div className="kmPassed"> {item.car_run_km}  კმ</div>
        <div className="type">{item.category_id}</div>
        <div className="engineVol">{item.engine_volume/1000} ბენზინი</div>
        <div className="wheel">{item.right_wheel === true ? "საჭე მარჯვნივ" : "საჭე მარცხნივ"}</div>
        <div className="avtomatika">{item.drive_type_id === 3 ? "ავტომატიკა" : "მექანიკა" }</div>
        <div className="location"> <img src={GeoFlag} className="geoFlag" /> თბილისი</div>
        
      </div>   

      <div className="line"></div>
      <div className="bottomLine">
      <img src={hot} alt="" className="hot"/> <div className="Rviews">{item.views}  ნახვა</div>  <div className="oval"></div>
      <div className="Timepassed"> 3 დღის წინ</div>
      </div> 
    </div>

  );
};

export default ResponsiveListItem;