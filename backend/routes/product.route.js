import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

export default router;
