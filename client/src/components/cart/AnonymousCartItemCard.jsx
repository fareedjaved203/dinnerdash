import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import "../../styles/cart/CartItemCard.css";

const AnonymousCartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item?.image} alt="product" />
      <div>
        <Link to={`/product/${item?.product}`}>{item?.name}</Link>
        <span>{`Price: Rs. ${item?.price}`}</span>
        <p onClick={() => deleteCartItems(item?.product)}>
          <DeleteIcon />
        </p>
      </div>
    </div>
  );
};

export default AnonymousCartItemCard;
