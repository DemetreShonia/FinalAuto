import flagIcon from "../Icons/geoFlag.png";
import motorIcon from "../Icons/motorIcon.png";
import wheel from "../Icons/wheel.png";
import steeringWheel from "../Icons/sache.png";
import driveType from "../Icons/avtomatica.png";
import heartShape from "../Icons/favorite.png";
import pencilIcon from "../Icons/note.png";
import carIcon from "../Icons/shedareba.png";
import doneIcon from "../Icons/done-path.png";
import "../Styles/ListItem.css";

import { ProductData } from "../../App";
type Props = {
  item: ProductData;
  modelName: string | undefined;
  manName: string | undefined;
};

const ListItem = ({ item, modelName, manName }: Props) => {
  function calculateTimePassed(ts: string): {
    hours: number;
    days: number;
    years: number;
  } {
    const currentDate = new Date();
    const providedDate = new Date(ts);

    const timePassed = currentDate.getTime() - providedDate.getTime();

    const hoursPassed = Math.floor(timePassed);
    const daysPassed = Math.floor(timePassed % 365);
    const yearsPassed = currentDate.getFullYear() - providedDate.getFullYear();

    return { hours: hoursPassed, days: daysPassed, years: yearsPassed };
  }

  const img = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;
  const postedDate: Date = new Date(item.order_date);
  const currentDate: Date = new Date();
  const timeDifference: number = currentDate.getTime() - postedDate.getTime();
  // If posted date is more than 1 day ago, then show days ago, else show hours ago
  const hoursAgo: number = Math.floor(timeDifference / (1000 * 3600));
  const daysAgo: number = Math.floor(timeDifference / (1000 * 3600 * 24));
  return (
    <div className="listItem">
      <img src={img} className="photo" />
      <div className="info">
        <div className="line1">
          <div className="carName">{manName} {modelName}</div>
          <div className="year">{item.prod_year}</div>
          <div className="checked">
            <div className="customs">
              {item.customs_passed && (<img src={doneIcon} alt="" />)}
              <div className={item.customs_passed ? "customsPassed" : "customsNotPassed"}>{item.customs_passed ? "განბაჟებული" : "განუბაჟებელი"}</div>
            </div>
          </div>
          <img src={flagIcon} className="flagIcon" />
          <div className="location"> თბილისი </div>
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
              {item.price >= 1000
                ? Math.round(item.price / 1000) +
                "," +
                item.price.toString().slice(-3)
                : item.price}{" "}
            </div>{" "}
            <div className="priceIcon">₾</div>
          </div>
        </div>
        <div className="line3">
          <div className="view"> {item.views} ნახვა </div>
          <div className="uploadDate">
            {" "}
            {daysAgo > 0 ? daysAgo + " დღის წინ" : hoursAgo + " საათის წინ"}
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
