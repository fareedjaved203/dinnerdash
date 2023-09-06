import { useCallback, useEffect, useMemo } from "react";
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
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../redux/actions/productAction";

import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";

import "../../styles/admin/productList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = useCallback(
    (id) => {
      dispatch(deleteProduct(id, alert));
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
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct(alert));
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "restaurant",
      headerName: "Restaurant",
      type: "text",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
    const result = [];
    products &&
      products.forEach((item) => {
        console.log([...item.category]);
        result.unshift({
          id: item._id,
          stock: item.stock,
          category: [...item.category],
          price: item.price,
          name: item.name,
          restaurant: [...item.restaurant],
        });
      });
    return result;
  }, [products]);

  return (
    <>
      <MetaData title={`ALL PRODUCTS -- Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
