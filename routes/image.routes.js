const express = require("express");
const router = express.Router();
const imagesController = require("../controllers/image.controller");

router.get("/", imagesController.getAllImages);
router.get("/:id", imagesController.getImageById);
router.get("/stadion/:stadion_id", imagesController.getImagesByStadionId);
router.post("/", imagesController.createImage);
router.put("/:id", imagesController.updateImageById);
router.delete("/:id", imagesController.deleteImageById);

module.exports = router;