const express = require("express");
const router = express.Router();
const superadmin = require("../Controllers/superadmin");

router.post('/signup', superadmin.signup);
router.post('/login', superadmin.login);
router.post('/logout', superadmin.logout);


module.exports = router;
