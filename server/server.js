require("dotenv").config({ path: "./config/config.env" });

const app = require("./app");

require("./config/database");

const cloudinary = require("cloudinary");

const port = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
