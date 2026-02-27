const express = require('express');
const router = express.Router();

router.get("/dashboard", (req,res) =>{
    const data = [
        {id: 1, filename: "dashboard-piechart", ext: ".jpg"},
        {id: 2, filename: "dashboard-bargraph", ext: ".jpg"},
        {id: 3, filename: "dashboard-line", ext: ".jpg"}
    ];

    res.render("pages/dashboard", {
        title: "dashboard",
        data: data
    });
});

modules.exports = router;