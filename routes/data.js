const express = require('express');
const router = express.Router();

router.get("/", (req,res) =>{
    const data = [
        {id: 1, filename: "Dashboard-piechart.png", alt: "placeholder"},
        {id: 2, filename: "Dashboard-bargraph.png", alt: "placeholder"},
        {id: 3, filename: "Dashboard-linegraph.png", alt: "placeholder"},
        {id: 4, filename: "Dashboard-percentage.png", alt: "placeholder"},
        {id: 5, filename: "Dashboard-circlegraph.png", alt: "placeholder"}
    ];

    res.render("pages/dashboard", {
        title: "dashboard",
        data: data
    });
});

module.exports = router;