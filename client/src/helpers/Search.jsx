import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/layout/MetaData";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const formStyle = {
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  padding: "10px",
  margin: "10px",
  fontSize: "18px",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "18px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const Search = ({ item }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/${item}/${keyword}`);
    } else {
      navigate(`/${item}`);
    }
  };

  return (
    <>
      <MetaData title="All Dishes --DinnerDash" />
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={submitSearchHandler}>
          <input
            style={inputStyle}
            type="text"
            value={keyword}
            placeholder="Search here..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input style={buttonStyle} type="submit" value="Search" />
        </form>
      </div>
    </>
  );
};

export default Search;
