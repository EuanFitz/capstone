const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>{
    res.render('pages/index', {
        title: "Home"
    });
});

router.get("/faq", (req, res) =>{
    res.render('pages/faq', {
        title: "FAQ"
    });
});

router.get("/user", (req, res) =>{
    res.render('pages/user', {
        title: "User Intake"
    });
});

router.get("/admin", (req, res) =>{
    res.render('pages/admin', {
        title: "Admin Login"
    });
});


module.exports = router;