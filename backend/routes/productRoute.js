const express = require('express');
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require('../controller/productcontroller');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get("/products",getAllProducts);
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
// router.put("/product/:id",updateProduct);
// router.delete("/product/:id",deleteProduct);

router.route("/admin/product/:id")
  .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct) // Handle PUT request for updating the product
  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
 

  router.route("/product/:id") .get(getProductDetails);

  router.put("/review",isAuthenticatedUser,createProductReview);
  router.route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser,deleteReview);

exports.router = router;
// export default router;
