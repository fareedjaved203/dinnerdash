import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { clearErrors, resetPassword } from "../../redux/actions/userAction";

import "../../styles/user/ResetPassword.css";
import { isPasswordValid } from "../../helpers/admin/users/formValidation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const firstUpdate = useRef(true);

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const isPassword = isPasswordValid(password);
      if (!isPassword) {
        alert.error("Password must be 8 characters Long");
      } else {
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm, alert));
      }
    } else {
      alert.error("Password Doesn't Match");
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      <>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Reset Password</h2>

            <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  minLength="8"
                  maxLength="20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  minLength="8"
                  maxLength="20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default ResetPassword;
