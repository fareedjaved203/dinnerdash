import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../../styles/restaurant/restaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <>
      <div className="product-container">
        <Card className="restaurant-card">
          <NavLink to={`/restaurant/${restaurant?._id}`}>
            <Card.Body>
              <Card.Title className="restaurant-name">{`Name: ${restaurant?.name}`}</Card.Title>
              <Card.Text className="restaurant-branch">{`Branch: ${restaurant?.branch}`}</Card.Text>
              <Card.Text className="restaurant-location">{`Location: ${restaurant?.location}`}</Card.Text>
            </Card.Body>
          </NavLink>
        </Card>
      </div>
    </>
  );
};

export default RestaurantCard;
