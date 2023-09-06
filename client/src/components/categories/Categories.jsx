// Categories.js

import { useState, useEffect } from "react";
import "../../styles/categories/categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState("");

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((category) =>
      category === selectedCategory ? updatedCategory : category
    );
    setCategories(updatedCategories);
    setSelectedCategory(null);
    setUpdatedCategory("");
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.map((category) => (
            <li className="category-item" key={category}>
              {category}
              <button
                className="category-delete-button"
                onClick={() => handleDeleteCategory(category)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input
          className="category-input"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="add-button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <hr />
      {/* <div className="update-category-container">
        <h3>Update Category</h3>
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>{" "}
        <input
          className="category-input"
          type="text"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
        />
        <button className="update-button" onClick={handleUpdateCategory}>
          Update Category
        </button>{" "}
      </div> */}
    </div>
  );
};
