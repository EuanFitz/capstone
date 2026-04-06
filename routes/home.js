const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>{
    res.set('Cache-Control', 'Cache-Control', 'public, max-age=86400'); //Caches for 24 hours
    res.render('pages/index', {
        title: "Home"
    });
});

router.get("/faq", (req, res) =>{
    res.set('Cache-Control', 'Cache-Control', 'public, max-age=2592000'); //Caches for 30 days as it will rarely change
    res.render('pages/faq', {
        title: "FAQ"
    });
});

router.get("/login", (req, res) =>{
    res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
    res.render('pages/adminlogin', {
        title: "Login"
    });
});

router.get("/register", (req, res) =>{
    res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
    res.render('pages/admin', {
        title: "Register"
    });
});

router.get("/success", (req, res) =>{
    res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
    res.render('pages/success', {
        title: "Registered"
    });
});

router.get("/dashboard", (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); //
    res.render("pages/dummydash", {
        title: "dashboard"
    });
});

router.get("/new-campaign", (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); //
    res.render("pages/campaign-setup", {
        title: "New Campaign"
    });
});

router.get("/setup-success", (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); //
    res.render("pages/setup-success", {
        title: "Campaign Started"
    });
});

router.get("/voice-setup", (req,res) =>{
    res.set('Cache-Control', "max-age=60,"); //
    res.render("pages/vishing-setup", {
        title: "New Voice"
    });
});

module.exports = router;