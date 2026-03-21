const express = require('express');
const authorize = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

//  accessible to both admin and user roles
router.get("/", authMiddleware, authorize("admin", "user"), (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/profile', {
    user: req.user
  });
});

module.exports = router;
