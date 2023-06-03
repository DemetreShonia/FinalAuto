import "./App.ListItem.css"
import flagIcon from "./geoFlag.png"

const ListItem = () => {
    return ( <div className="listItem">
        <img src="https://static.my.ge/myauto/photos/8/1/6/0/6/large/92606186_6.jpg?v=7" className="photo"/> 
        <div className="info"> 
        <div className="line1"> 
        <div className="carName">LAND ROVER Range Rover Evoque</div>
        <div className="year">2013 წ</div>
        <div className="checked"> განბაჟებული</div>
        <img src={flagIcon} className="flagIcon" />
        <div className="location"> მდებარეობა </div>
        </div>
        <div className="line2"> 
        <div className="carInfo">
        <div className="engine"> 1.8 დატ. ჰიბრიდი </div>
        <div className="car_run_km">2000km</div>
        <div className="engineType"> ავტომატიკა </div>
        <div className="steeringWheel">მარჯვნივ</div>
        </div>
        <div className="price"> <div className="priceVal"> 12,200</div> <div className="priceIcon">₾</div></div>
        </div>
        <div className="line3"> 
        <div className="view"> 549 ნახვა  "  "</div>
        <div className="uploadDate"> 2 დღის წინ </div>
        <div className="someIcons"> icon1 icon2 icon3</div>
        </div>

        </div>
    </div> );
}
 
export default ListItem;