import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link, Navigate } from "react-router-dom";

import { clearErrors, login, register } from "../../redux/actions/userAction";
import { addItemsToCart } from "../../redux/actions/cartAction";
import { addToCartHandler } from "../../helpers/products/productDetailsHelper";

import "../../styles/user/loginSignup.css";
import { createFormData } from "../../helpers/admin/users/formValidation";
import { validateRegisterData } from "../../helpers/users/validateRegisterData";
import { handleAvatarChange } from "../../helpers/users/handleAvatarChange";
import { addItemsToCartApi } from "../../api/cart/cartApi";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [avatar, setAvatar] = useState(import.meta.env.VITE_DEFAULT_DP);
  const [avatarPreview, setAvatarPreview] = useState(
    import.meta.env.VITE_DEFAULT_DP
  );

  const [user, setUser] = useState({
    fullName: "",
    name: "",
    email: "",
    password: "",
  });

  const { fullName, name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword, alert));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (validateRegisterData(fullName, name, email, password, alert)) {
      const userObj = {
        fullName: user.fullName,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: avatar,
      };

      const myForm = createFormData(userObj);
      dispatch(register(myForm, alert));
    } else {
      alert.error("Please provide valid data for registration.");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      handleAvatarChange(e, setAvatarPreview, setAvatar);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const storeCart = async () => {
    const redirectUrl = localStorage.getItem("redirectUrl");
    let data = localStorage.getItem("cartItems");
    if (data && redirectUrl) {
      data = JSON.parse(data);
      for (const item of data.products) {
        await addItemsToCartApi(item.product, item.quantity, alert);
      }
      console.log(data);
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("cartItems");

      setTimeout(() => {
        navigate(redirectUrl);
      }, 100);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      (async () => {
        const data = await storeCart();
        if (!data) {
          navigate("/account");
        }
      })();
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  maxLength="20"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  maxLength="32"
                  minLength="2"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  maxLength="32"
                  minLength="2"
                  name="fullName"
                  value={fullName}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  minLength="8"
                  maxLength="20"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default LoginSignUp;
