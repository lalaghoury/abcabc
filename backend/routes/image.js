const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/MultiMulter");
const cloudinaryController = require("../controllers/cloudinaryController");

router.post("/", upload.array("images"), async (req, res) => {
  try {
    const image_urls = [];
    for (const file of req.files) {
      const response = await cloudinaryController.upload(file.path);
      image_urls.push(response.secure_url);
    }
    res.status(201).json({ success: true, image_urls });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
