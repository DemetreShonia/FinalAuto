import flagIcon from "../Icons/geoFlag.png";
import motorIcon from "../Icons/motorIcon.png";
import wheel from "../Icons/wheel.png";
import steeringWheel from "../Icons/sache.png";
import driveType from "../Icons/avtomatica.png";
import heartShape from "../Icons/heartShape.png";
import pencilIcon from "../Icons/pencilIcon.png";
import carIcon from "../Icons/carShape.png";
import doneIcon from "../Icons/done-path.png"
import "../Styles/ListItem.css";

import { ProductData } from "../../App";
type Props = {
  item: ProductData;
};

const ListItem = ({ item }: Props) => {
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
    <div className="listItem">
      <img src={img} className="photo" />
      <div className="info">
        <div className="line1">
          <div className="carName">LAND ROVER Range Rover Evoque</div>
          <div className="year">{item.prod_year}</div>
          <div className="checked"> <img src={doneIcon} alt="" /> განბაჟებული</div>
          <img src={flagIcon} className="flagIcon" />
          <div className="location"> მდებარეობა </div>
        </div>
        <div className="line2">
          <div className="carInfo">
            <div className="engine">
              {" "}
              <img src={motorIcon} className="motorIcon" />
              {+"  " + item.engine_volume / 1000}დატ. ჰიბრიდი{" "}
            </div>
            <div className="car_run_km">
              <img src={wheel} className="wheelIc" />
              {item.car_run_km} კმ
            </div>
            <div className="engineType">
              {" "}
              <img src={driveType} className="driveIcon" />
              {item.drive_type_id === 3 ? "ავტომატიკა" : "მექანიკა"}{" "}
            </div>
            <div className="steeringWheel">
              <img src={steeringWheel} className="sache" />
              {item.right_wheel === true ? "მარჯვენა" : "მარცხენა"}
            </div>
          </div>
          <div className="price">
            {" "}
            <div className="priceVal">
              {" "}
              {Math.round(item.price / 1000) + "," + (item.price % 1000)}{" "}
            </div>{" "}
            <div className="priceIcon">₾</div>
          </div>
        </div>
        <div className="line3">
          <div className="view"> {item.views}</div>
          <div className="uploadDate">
            {" "}
            {`   ${calculateTimePassed(item.order_date).years}`}
          </div>
          <div className="someIcons">
            {" "}
            <img src={pencilIcon} alt="  " /> <img src={carIcon} alt="  " />{" "}
            <img src={heartShape} alt="  " />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
