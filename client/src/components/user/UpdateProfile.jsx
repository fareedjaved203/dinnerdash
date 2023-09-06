import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import LoadingScreen from "../layout/Loader/Loader";
import {
  isEmailValid,
  isNameValid,
} from "../../helpers/admin/users/formValidation";

import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

import "../../styles/user/UpdateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const firstUpdate = useRef(true);

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const isFullName = isNameValid(fullName, 4, 32);
    const isName = isNameValid(name, 2, 32);
    const isEmail = isEmailValid(email);

    if (!isFullName) {
      alert.error("Name Should Contain Atleast 4 Characters");
    }
    if (!isName) {
      alert.error("Name Should Contain Atleast 2 Characters And Must Be Valid");
    } else if (!isEmail) {
      alert.error("Invalid Email");
    }

    if (isFullName && isEmail && isName) {
      const myForm = new FormData();
      myForm.set("fullName", fullName);
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm, alert));
    }
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const defaultImageHandler = async () => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      const response = await fetch(user.avatar.url);
      const data = await response.blob();
      const defaultAvatarFile = new File([data], "default-avatar.jpg", {
        type: "image/jpg",
      });
      reader.readAsDataURL(defaultAvatarFile);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      defaultImageHandler();
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser(alert));

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
