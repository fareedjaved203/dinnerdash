import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import "../../styles/user/Account.css";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MetaData title={`${user.name}'s Account`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>
              </div>
              <div>
                <h4>Display Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
