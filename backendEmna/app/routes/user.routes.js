const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Routes for Tests

router.get("/", userController.all);
router.get("/:id", userController.get);
router.post("/:id", userController.update);
router.put("/:id", userController.changeStatue);
module.exports = router;
