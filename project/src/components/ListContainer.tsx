import { ProductData } from "../App";
import ListItem from "./ListItem";

type Props = {
  productList: ProductData[];
};
const ListContainer = ({ productList }: Props) => {
  return (
    <div className="list-container">
      {productList.map((item) => (
        <ListItem item={item} />
      ))}
    </div>
  );
};

export default ListContainer;
