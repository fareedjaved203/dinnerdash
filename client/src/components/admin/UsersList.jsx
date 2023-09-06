import { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";

import "../../styles/admin/productList.css";

const UsersList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = useCallback(
    (id) => {
      dispatch(deleteUser(id, alert));
    },
    [dispatch]
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers(alert));
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        if (user._id === params.getValue(params.id, "id")) {
          return null;
        }
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const rows = [];

    users &&
      users.forEach((item) => {
        rows.unshift({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });

    return rows;
  }, [users]);

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;
