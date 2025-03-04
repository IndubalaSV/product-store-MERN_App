import express from "express";
import connectDB from "./config/db.js";
import path from "path";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

let _dirname = path.resolve();

let app = express();
app.use(express.json());

import productRoutes from "./routes/product.route.js";
app.use("/api/products", productRoutes);

if (process.env.ENVIRONMENT === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:5000");
});
