import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import "../../styles/cart/CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item?.product?.images?.url} alt="product" />
      <div>
        <Link to={`/product/${item?.product?._id}`}>{item?.product?.name}</Link>
        <span>{`Price: Rs. ${item?.product?.price}`}</span>
        <p onClick={() => deleteCartItems(item?.product?._id)}>
          <DeleteIcon />
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
