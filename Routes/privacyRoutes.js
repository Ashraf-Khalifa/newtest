// privacyPolicyRoutes.js
const express = require("express");
const router = express.Router();
const PrivacyPolicyController = require("../controllers/PrivacyController");

router.post("/add", PrivacyPolicyController.addPrivacyPolicy);
router.get("/list", PrivacyPolicyController.getPrivacyPolicies);
router.delete("/delete/:policyId", PrivacyPolicyController.deletePrivacyPolicy);
router.put("/update/:policyId", PrivacyPolicyController.updatePrivacyPolicy);

module.exports = router;
