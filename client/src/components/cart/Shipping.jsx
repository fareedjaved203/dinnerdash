import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Phone as PhoneIcon,
} from "@material-ui/icons";

import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";

import "../../styles/cart/Shipping.css";
import { myOrders, clearErrors } from "../../redux/actions/orderAction";
import LoadingScreen from "../layout/Loader/Loader";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Phone Number should be 11 digits Long");
      return;
    }
    if (!orders?.order[0]) {
      console.log("yea mr. white");
      const shippingInfo = {
        address,
        city,
        phoneNo,
      };
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    }
    navigate("/order/confirm", { replace: true });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders(alert));
    setAddress(orders?.order[0]?.shippingInfo?.address);
    setCity(orders?.order[0]?.shippingInfo?.city);
    setPhoneNo(orders?.order[0]?.shippingInfo?.phoneNo);
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div>
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  minLength="5"
                  maxLength="100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <LocationCityIcon />
                <input
                  type="text"
                  placeholder="City"
                  required
                  minLength="3"
                  maxLength="20"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <PhoneIcon />
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="11"
                />
              </div>

              <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                disabled={address && city && phoneNo ? false : true}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
