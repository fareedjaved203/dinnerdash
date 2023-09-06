import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../redux/actions/orderAction";

import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";

import "../../styles/admin/productList.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

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
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders(alert));
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id, alert));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.order.forEach((item) => {
      rows.unshift({
        id: item._id,
        itemsQty: item.orderItems.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0),
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList;
