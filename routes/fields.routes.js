const express = require("express");
const router = express.Router();
const fieldController = require("../controllers/fields.controller");

router.get("/", fieldController.getAllFields);
router.post("/", fieldController.createField);
router.get("/GetfieldOwner/:id", fieldController.getFieldOwner)
router.get("/priceBooking", fieldController.getfielsdwithBookingTime)
router.get("/:id", fieldController.getFieldById);
router.put("/:id", fieldController.updateFieldById);
router.delete("/:id", fieldController.deleteFieldById);

module.exports = router;