import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import "../../styles/product/productCard.css";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.ratings,
    isHalf: true,
  };
  return (
    <>
      <div className="product-container">
        <Card>
          <NavLink to={`/product/${product._id}`}>
            <Card.Img variant="top" src={product?.images?.url} />
            <Card.Body>
              <Card.Title className="card-title">{product.name}</Card.Title>
              <div>
                <ReactStars {...options} />{" "}
                <span className="card-text">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <Card.Text className="card-text">{`Rs. ${product.price}`}</Card.Text>
            </Card.Body>
          </NavLink>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
