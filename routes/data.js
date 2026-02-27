const express = require('express');
const router = express.Router();
        

router.get("/", (req,res) =>{
    res.set('Cache-Control', "max-age:300, stale-while-revalidate");
    res.render("pages/dashboard", {
        title: "dashboard"
    });
});



module.exports = router;