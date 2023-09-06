import { useMemo } from "react";
import ReactStars from "react-rating-stars-component";

import defaultUser from "../../images/defaultUser.jpg";

import "../../styles/product/Reviews.css";

const ReviewCard = ({ review, user }) => {
  const options = useMemo(
    () => ({
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      size: window.innerWidth < 600 ? 20 : 25,
      value: review?.rating,
      isHalf: true,
    }),
    [review?.rating]
  );
  console.log(review);
  return (
    <div className="card-container">
      <img className="card-image" src={defaultUser} alt="Default User" />
      <div className="card-content">
        <h3 className="comment">Anonymous</h3>
        <ReactStars {...options} className="stars" />
        <h2 className="comment">
          <b>Comment:</b> <i> {review?.comment}</i>
        </h2>
      </div>
    </div>
  );
};

export default ReviewCard;
