// const express = require('express');
// const router = express.Router();
// // adding authn consts here
// const authMiddleware = require("../middleware/auth");
// const authorize = require("../middleware/authorization");

// router.get("/", (req, res) =>{
//     res.set('Cache-Control', 'Cache-Control', 'public, max-age=86400'); //Caches for 24 hours
//     res.render('pages/index', {
//         title: "Home"
//     });
// });

// router.get("/faq", (req, res) =>{
//     res.set('Cache-Control', 'Cache-Control', 'public, max-age=2592000'); //Caches for 30 days as it will rarely change
//     res.render('pages/faq', {
//         title: "FAQ"
//     });
// });

// router.get("/login", (req, res) =>{
//     res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
//     res.render('pages/adminlogin', {
//         title: "Login"
//     });
// });

// router.get("/register", (req, res) =>{
//     res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
//     res.render('pages/admin', {
//         title: "Register"
//     });
// });

// router.get("/success", (req, res) =>{
//     res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
//     res.render('pages/success', {
//         title: "Registered"
//     });
// });


// router.get("/dashboard", (req,res) =>{
//     res.set('Cache-Control', "max-age=60,"); //
//     res.render("pages/dummydash", {
//         title: "dashboard"
//     });
// });



const express = require('express');
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorization");
const router = express.Router();

router.get("/", (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400');
  res.render('pages/index', { title: "Home" });
});

router.get("/404", (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400');
  res.render('pages/404', { title: "ClickSafe Error Message" });
});

router.get("/login", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/adminlogin', { title: "Login" });
});

router.get("/register", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/admin', { title: "Register" });
});

router.get("/success", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/success', {title: "Registration Completed"});
});

// --------------Router: both roles allowed
router.get("/dummydash", authMiddleware, authorize("admin", "user"), (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/dummydash', {
    title: "Dashboard",
    user: req.user  // { id, role } → used in EJS for conditional auth or allowance. online resourse say "rendering"
  });
});

router.get("/faq", authMiddleware, authorize("admin","user"),(req, res) => {
  res.set('Cache-Control', 'public, max-age=2592000');
  res.render('pages/faq', {
    title: "Frequently Asked Questions",
    user: req.user
    });
});

router.get("/profile", authMiddleware, authorize("admin","user"),(req, res) => {
  res.set('Cache-Control', 'public, max-age=2592000');
  res.render('pages/profile', {
    username: req.user.username,
    title: "Your Profile",
    user: req.user
    });
});

module.exports = router;
