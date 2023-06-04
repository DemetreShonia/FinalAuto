import { ProductData } from "../../App";
import ListItem from "./ListItem";
import "../Styles/ListContainer.css";
type Props = {
  productList: ProductData[];
};
const ListContainer = ({ productList }: Props) => {
  return (
    <div className="list-container">
      <div className="list-content">
        {productList.map((item) => (
          <ListItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
