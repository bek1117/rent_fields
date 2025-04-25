const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payments.controller");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePaymentById);
router.delete("/:id", paymentController.deletePaymentById);

module.exports = router;
