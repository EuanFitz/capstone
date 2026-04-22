const express = require("express");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorization");
const User = require('../model/User');
const router = express.Router();
const { encrypt, decrypt } = require("../middleware/encryption")

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
  res.render('pages/login', { title: "Login" });
});

router.get("/faq",(req, res) => {
  res.set('Cache-Control', 'public, max-age=2592000');
  res.render('pages/faq', {title: "Frequently Asked Questions"});
});

router.get("/register", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/register', { title: "Register" });
});

router.get("/success", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/success', {title: "Registration Completed"});
});

router.get("/emailTemplate", authMiddleware, authorize("admin"), (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/emailTemplate', {
    title: "Email Templates",
    user: req.user
  });
});

router.get("/new-campaign", authMiddleware, authorize("admin"), (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); 
    res.render("pages/campaign-setup", {
        title: "New Campaign",
        user: req.user
    });
});
 
router.get("/setup-success", authMiddleware, authorize("admin"), (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); 
    res.render("pages/setup-success", {
        title: "Campaign Started",
        user: req.user
    });
});
 
router.get("/voice-setup", authMiddleware, authorize("admin"), (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); 
    res.render("pages/vishing-setup", {
        title: "New Voice",
        user: req.user
    });
});

// --------------Router: both roles allowed
router.get("/dummydash", authMiddleware, authorize("admin", "user"), (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.render('pages/dummydash', {
    title: "Dashboard",
    user: req.user  // { id, role } → used in EJS for conditional auth or allowance. online resourse say "rendering"
  });
});

router.get("/support", authMiddleware, authorize("admin","user"),(req, res) => {
  res.set('Cache-Control', 'public, max-age=2592000');
  res.render('pages/support', {
    title: "Support",
    user: req.user
    });
});

router.get("/profile", authMiddleware, authorize("admin","user"), async (req, res) => {
  try{
    //Find and pull the user from the database based on their token ID
  const user = await User.findById(req.user.id);
  res.set('Cache-Control', 'public', 'no-store');
  res.render('pages/profile', {
      title: "Profile",
      user: {
        role: user.role,
        username: user.username,  
        displayName: user.displayName ? user.displayName: '', 
        email: user.email ? decrypt(user.email): '',
        bio: user.bio ? decrypt(user.bio): "no bio"
      }
    });
  } catch(error){
    console.log(error);
    res.redirect('/login');
  }
});

router.get("/test", (req, res) => {
  console.log("test route hit");
  console.log("cookies:", req.cookies);
  res.json({ cookies: req.cookies });
});

module.exports = router;
