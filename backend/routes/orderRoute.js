const express = require("express")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/ordercontroller")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router()

router.post("/order/new",isAuthenticatedUser,newOrder)
router.get("/order/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder)
router.get("/orders/me",isAuthenticatedUser,myOrders)
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)

router.route("/admin/order/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)


exports.router = router;