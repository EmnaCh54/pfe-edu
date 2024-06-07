const express = require("express");
const router = express.Router();
const DocumentController = require("../controllers/document.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "FA." + getFileExtension(file.originalname));
  },
});
function getFileExtension(filename) {
  // Split the filename by dots
  const parts = filename.split(".");
  // If there is only one part, there is no extension
  if (parts.length === 1) {
    return "";
  }
  // Return the last part which is the extension
  return parts.pop();
}
const upload = multer({ storage: storage });

// Route pour trouver toutes les corrections
router.post("/", upload.single("file"), DocumentController.store);
router.put("/:id", DocumentController.update);
router.get("/", DocumentController.all);
router.get("/:user_id", DocumentController.getDocumentsByUser);
router.delete("/:document_id", DocumentController.delete);

module.exports = router;
