import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {
  MailOutline as MailOutlineIcon,
  Person as PersonIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@material-ui/icons";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { updateUserSubmitHandler } from "../../helpers/admin/users/updateSubmitHandler";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";

import "../../styles/admin/productList.css";
import LoadingScreen from "../layout/Loader/Loader";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [fullname, setFullName] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId, alert));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
      setFullName(user?.fullname);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, updateError, user, userId]);

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <LoadingScreen />
          ) : (
            <form
              className="createProductForm"
              onSubmit={(e) =>
                updateUserSubmitHandler(
                  e,
                  email,
                  role,
                  alert,
                  userId,
                  dispatch,
                  updateUser
                )
              }
            >
              <h1>Update User</h1>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button id="createProductBtn" type="submit">
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
