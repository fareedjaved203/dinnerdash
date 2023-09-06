import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import LoadingScreen from "../layout/Loader/Loader";
const ProductCard = lazy(() => import("../product/ProductCard"));

import {
  clearErrors,
  getRestaurantDetails,
} from "../../redux/actions/restaurantAction";

import "../../styles/restaurant/restaurantDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRestaurantDetails(id, alert));
  }, [dispatch, id, error, alert]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <MetaData title={`${restaurant?.restaurant?.name} -- DinnerDash`} />
          <div className="RestaurantDetails">
            <div>
              <div className="detailsBlock-1">
                <h2>{restaurant?.restaurant?.name}</h2>
                <p>restaurant # {restaurant.restaurant?._id}</p>
              </div>

              <div className="detailsBlock-4">
                Branch : <span>{restaurant?.restaurant?.branch}</span>
              </div>

              <div className="detailsBlock-4">
                Location : <span>{restaurant?.restaurant?.location}</span>
              </div>
            </div>
          </div>

          <h3 className="reviewsHeading">PRODUCTS</h3>

          <Suspense fallback={<LoadingScreen />}>
            {restaurant.products &&
              restaurant.products.map((value) => (
                <ProductCard key={value._id} product={value} />
              ))}
          </Suspense>
        </>
      )}
    </>
  );
};

export default RestaurantDetails;
