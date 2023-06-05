import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
type Props = {
  productList: ProductData[];
};
const ListContainer = ({ productList }: Props) => {
  return (
    <div className="list-container">
      <div className="headline"> <div className="carNumber"> 120000 განცხადება</div> <div className="timeFilter"> ბოლო 3 საათი </div> 
      <div className="filterCategoty"> გაფილტვრა</div>
      </div>
      <div className="list-content">
        {productList.map((item) => (
          <ListItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
