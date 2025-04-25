const router = require("express").Router();
const UserRouter = require("./users.routes");
const fieldRoute = require("./fields.routes");
const bookingRoute = require("./booking.routes");
const paymentRoute = require("./payment.routes");
const reviewRoute = require("./review.routes")
const imageRoute = require("./image.routes")

router.use("/users", UserRouter);
router.use("/field", fieldRoute);
router.use("/booking", bookingRoute);
router.use("/payment", paymentRoute);
router.use("/review", reviewRoute)
router.use("/image", imageRoute)

module.exports = router;