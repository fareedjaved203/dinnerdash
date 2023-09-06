require("dotenv").config({ path: "./config/config.env" });

const app = require("./app");

require("./config/database");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
