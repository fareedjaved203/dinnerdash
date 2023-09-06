import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import ProductCard from "../product/ProductCard";

import { clearErrors, getProduct } from "../../redux/actions/productAction";

import "../../styles/home/home.css";
import LoadingScreen from "../layout/Loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <MetaData title="Dinner Dash - Home" />
          <h1 className="welcome-heading">
            {user ? (
              <>
                Welcome to Dinner Dash{" "}
                <span className="user-name">{user?.name}</span>
              </>
            ) : (
              `Welcome to Dinner Dash`
            )}
          </h1>
          <h2 className="trending-heading">Trending Products</h2>
          <div className="container">
            {products &&
              products.map(
                (product) =>
                  product.display &&
                  product.stock > 0 && (
                    <ProductCard product={product} key={product._id} />
                  )
              )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
