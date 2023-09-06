import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Launch as LaunchIcon } from "@material-ui/icons";

import MetaData from "../layout/MetaData";

import { clearErrors, myOrders } from "../../redux/actions/orderAction";

import "../../styles/order/myOrders.css";
import LoadingScreen from "../layout/Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "name",
      headerName: "Items Name",
      type: "text",
      minWidth: 150,
      flex: 0.3,
    },
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
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Total Price",
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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders?.order?.forEach((item) => {
      rows.unshift({
        id: item._id,
        itemsQty: item.orderItems.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0),
        name: item.orderItems.map((item) => {
          return item.name;
        }),
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders(alert));
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
