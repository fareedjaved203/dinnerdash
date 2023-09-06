import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../redux/actions/productAction";

import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";

import "../../styles/admin/productReviews.css";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId, alert));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId, alert));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId, alert));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
  ];

  const rows = useMemo(() => {
    const result = [];
    reviews &&
      reviews.forEach((item) => {
        result.push({
          id: item._id,
          rating: item.rating,
          comment: item.comment,
        });
      });
    return result;
  }, [reviews]);

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
