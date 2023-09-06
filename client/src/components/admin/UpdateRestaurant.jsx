import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {
  Description as DescriptionIcon,
  Spellcheck as SpellcheckIcon,
} from "@material-ui/icons";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  getRestaurantDetails,
  updateRestaurant,
} from "../../redux/actions/restaurantAction";
import { UPDATE_RESTAURANT_RESET } from "../../redux/constants/restaurantConstants";

import "../../styles/admin/productList.css";

const UpdateRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, restaurant } = useSelector((state) => state.restaurant);
  console.log(restaurant);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.restaurantOperations
  );

  const [name, setName] = useState(restaurant?.restaurant?.name);
  const [location, setLocation] = useState(restaurant?.restaurant?.location);
  const [branch, setBranch] = useState(restaurant?.restaurant?.branch);

  const restaurantId = id;

  const getDetails = () => {
    if (restaurant && restaurant?.restaurant?._id !== restaurantId) {
      dispatch(getRestaurantDetails(restaurantId, alert));
    }
  };

  useEffect(() => {
    setName(restaurant?.restaurant?.name);
    setLocation(restaurant?.restaurant?.location);
    setBranch(restaurant?.restaurant?.branch);
  }, [restaurant]);

  useEffect(() => {
    getDetails();
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      alert.error("Something went Wrong");
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
      alert.error("Something went Wrong during Updation");
    }

    if (isUpdated) {
      navigate("/admin/restaurants");
      dispatch({ type: UPDATE_RESTAURANT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError]);

  const updateRestaurantSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("location", location);
    myForm.set("branch", branch);

    dispatch(updateRestaurant(restaurantId, myForm, alert));
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateRestaurantSubmitHandler}
          >
            <h1>Update Restaurant</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Restaurant Name"
                required
                minLength="4"
                maxLength="20"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Restaurant Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                cols="30"
                rows="1"
                minLength="4"
                maxLength="100"
              ></textarea>
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Restaurant Branch"
                required
                minLength="4"
                maxLength="20"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateRestaurant;
