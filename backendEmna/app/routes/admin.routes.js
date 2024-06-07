const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/configuration.controller.js");
// router.put("/:id", adminController.updateAdminProfile);
// router.get("/:id", adminController.getAdminProfile);
// router.patch("/activate/:id", adminController.activateAdmin);
router.patch("/desactivate/:id", adminController.deactivateAdmin);

router.get("/stat", adminController.stat);
router.get("/statContent", adminController.statContent);

module.exports = router;
