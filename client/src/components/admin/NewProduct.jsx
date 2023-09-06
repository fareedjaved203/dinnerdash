import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Select from "react-select";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { clearErrors, createProduct } from "../../redux/actions/productAction";

import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";

import "../../styles/admin/newProduct.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.newProduct);

  const { restaurants } = useSelector((state) => state.restaurants);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [display, setDisplay] = useState(false);
  const [all_categories, setAllCategories] = useState([]);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState(import.meta.env.VITE_DEFAULT_PRODUCT);
  const [imagesPreview, setImagesPreview] = useState(
    import.meta.env.VITE_DEFAULT_PRODUCT
  );
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    console.log(storedCategories);
    if (storedCategories) {
      setAllCategories(JSON.parse(storedCategories));
    }
  }, []);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "300px",
    }),
  };

  const handleCategoryChange = useCallback((selectedOptions) => {
    const categories = selectedOptions.map((option) => option.value);
    setSelectedCategories(categories);
  }, []);

  const handleRestaurantChange = useCallback((selectedOption) => {
    setSelectedRestaurants(selectedOption.value);
  }, []);

  const handleDisplayChange = useCallback((selectedOption) => {
    setDisplay(selectedOption.value);
  }, []);

  const productOptions = () => {
    const data = all_categories.map((category) => {
      return { value: category, label: category };
    });

    const res = [...data];

    return res;
  };

  const restaurantOptions = () => {
    const data = restaurants.restaurants.map((category) => {
      return { value: category.name, label: category.name };
    });

    const res = [...data];

    return res;
  };

  const options3 = [
    { value: true, label: "Show Product" },
    { value: false, label: "Hide Product" },
  ];

  const options1 = useMemo(productOptions, [all_categories]);
  const options2 = useMemo(restaurantOptions, [restaurants.restaurants]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", selectedCategories);
    myForm.set("restaurant", selectedRestaurants);
    myForm.set("stock", stock);
    myForm.set("images", images);
    myForm.set("display", display);

    dispatch(createProduct(myForm, alert));
    alert.success("Product Added");
    navigate("/admin/dashboard");
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(reader.result);
          setImages(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />

        <>
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>
              {restaurant}

              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  maxLength="20"
                  minLength="4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="25000"
                  onInput="validity.valid||(value='');"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                  maxLength="100"
                  minLength="4"
                ></textarea>
              </div>

              <div id="createProductDisplaySelection1">
                <Select
                  required
                  isMulti
                  options={options1}
                  placeholder="Select Categories"
                  styles={customStyles}
                  onChange={handleCategoryChange}
                />
              </div>

              <div id="createProductDisplaySelection2">
                <Select
                  required
                  options={options2}
                  placeholder="Select Restaurants"
                  styles={customStyles}
                  onChange={handleRestaurantChange}
                />
              </div>
              <div id="createProductDisplaySelection3">
                <Select
                  required
                  options={options3}
                  placeholder="Display Product"
                  styles={customStyles}
                  onChange={handleDisplayChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="stock"
                  min="0"
                  max="100"
                  onInput="validity.valid||(value='');"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                <img src={imagesPreview} alt="Product Preview" />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                // disabled={loading ? true : false}
              >
                Create
              </Button>
            </form>
          </div>
        </>
      </div>
    </>
  );
};

export default NewProduct;
