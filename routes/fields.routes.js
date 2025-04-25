const express = require("express");
const router = express.Router();
const fieldController = require("../controllers/fields.controller");

router.get("/", fieldController.getAllFields);
router.get("/:id", fieldController.getFieldById);
router.post("/", fieldController.createField);
router.put("/:id", fieldController.updateFieldById);
router.delete("/:id", fieldController.deleteFieldById);

module.exports = router;