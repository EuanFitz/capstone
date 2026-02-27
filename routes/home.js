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

router.get("/user", (req, res) =>{
    res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
    res.render('pages/user', {
        title: "User Intake"
    });
});

router.get("/admin", (req, res) =>{
    res.set('Cache-Control', 'no-store'); //No cache can have sensitive data
    res.render('pages/admin', {
        title: "Admin Login"
    });
});


module.exports = router;