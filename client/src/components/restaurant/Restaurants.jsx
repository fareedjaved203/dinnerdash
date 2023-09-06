import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import MetaData from "../layout/MetaData";
import RestaurantCard from "./RestaurantCard";
import Search from "../../helpers/Search";

import {
  clearErrors,
  getRestaurant,
} from "../../redux/actions/restaurantAction";

import "../../styles/restaurant/Restaurant.css";

const Restaurants = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { key } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    restaurants,
    error,
    restaurantsCount,
    resultPerPage,
    filteredRestaurantCount,
  } = useSelector((state) => state.restaurants);

  const keyword = key;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRestaurant(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  let count = filteredRestaurantCount;
  return (
    <div className="restaurant-container">
      <MetaData title="All Dishes --DinnerDash" />

      <Search item="restaurants" />

      {restaurants &&
        restaurants.restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}

      {resultPerPage < count && (
        <div className="pagination-container">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={restaurantsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </div>
  );
};

export default Restaurants;
