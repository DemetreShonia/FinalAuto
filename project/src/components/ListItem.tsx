import { ProductData } from "../App";

type Props = {
  item: ProductData;
};

const ListItem = ({ item }: Props) => {
  console.log(item.car_id);
  return <>HEY</>;
};

export default ListItem;
