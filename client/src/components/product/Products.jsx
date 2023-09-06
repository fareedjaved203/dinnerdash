import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Pagination from "react-js-pagination";

import MetaData from "../layout/MetaData";
import Search from "../../helpers/Search";

import ProductCard from "./ProductCard";

import { clearErrors, getProduct } from "../../redux/actions/productAction";

import "../../styles/product/Product.css";
import LoadingScreen from "../layout/Loader/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { key } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 3000]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState(0);
  const {
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductCount,
    loading,
  } = useSelector((state) => state.products);

  const keyword = key;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (event, newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    setCategories([
      ...new Set(
        products.flatMap((item) => {
          return item.category;
        })
      ),
    ]);
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = filteredProductCount;
  return (
    <div className="products-container">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <MetaData title="All Dishes --DinnerDash" />
          <h2 className="productsHeading">Dishes</h2>
          <Search item="products" />
          <div className="products">
            {products &&
              products.map(
                (product) =>
                  product.display && (
                    <ProductCard product={product} key={product._id} />
                  )
              )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={3000}
            />

            <Typography>Categories</Typography>
            <ul className="categories-list">
              {categories?.map((category) => (
                <li
                  key={category}
                  onClick={() => setCategory(category)}
                  className="category-item"
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={ratingHandler}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage && (
            <div className="pagination-container">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
