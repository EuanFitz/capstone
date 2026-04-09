// const express = require('express');
// const authorize = require ("../middleware/authorization");
// const authMiddleware = require ("../middleware/auth");
// const router = express.Router();

// router.get("/protected", authMiddleware, authorize("admin"), (req, res) =>{
//     res.status(200).json({message: "Welcome, admin user" });
// });

// module.exports = router;


const express = require('express');
const authorize = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// GET /admin — render admin panel (admin only)
router.get("/", authMiddleware, authorize("admin"), (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/adminpanel', {
    user: req.user  // pass user data to the template
  });
});

// Example API-style protected route
router.get("/protected", authMiddleware, authorize("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, admin user" });
});

module.exports = router;
