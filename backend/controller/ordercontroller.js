const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");

//Create New order
exports.newOrder = catchasyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//Get single order:-
exports.getSingleOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //isse kya hoga wo user ki id leke jaaega aur user waale collection mei se name aur email show krega
  if (!order) {
    return next(new ErrorHandler("Order not found ", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in userOrders:
exports.myOrders = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all Orders:
exports.getAllOrders = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.paymentInfo.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
   
  });
});

//update order status:-
exports.updateOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorHandler("Order not found ", 404));
  }
  
  if (order.paymentInfo.orderStatus == "Delivered") {
    return next(
      new ErrorHandler("You have already delivered this product", 400)
    );
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.paymentInfo.orderStatus = req.body.status;
  if (req.body.status == "Delivered") {
    order.paymentInfo.deliveredAt = Date.now;
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete Order -- admin:-
exports.deleteOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found ", 404));
  }

  res.status(200).json({
    success: true,
    message: "order deleted successfully",
  });
});
