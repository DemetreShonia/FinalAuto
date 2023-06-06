import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
import Filter from "./Filter";
import TimeFilter from "./TimeFilter";
type Props = {
  productList: ProductData[];
};
const ListContainer = ({ productList }: Props) => {
  return (
    <div className="list-container">
      <div className="headline"> <div className="carNumber"> 120000 განცხადება</div> 
      <TimeFilter/> 
      <Filter/>
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
