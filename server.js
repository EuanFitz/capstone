const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT_HTTPS = process.env.PORT || 3443; 

app.use(express.json());


//--------------Helmet setup and stipulations-----------

app.use(helmet({
    strictTransportSecurity:  {
        maxAge: 31536000, 
        includeSubDomains: true,
        preload: true 
    },
    contentSecurityPolicy: {
      directives: {
        "defaultSrc": ["'self'"], 
        "scriptSrc": ["'self'", "https://cdn.jsdelivr.net"],
        "styleSrc": ["'self'", "'unsafe-inline'"], 
        "imgSrc": ["'self'", "data:"], 
        "upgradeInsecureRequests": [],
        // "requireTrustedTypesFor": ["'script'"],

      },
    }
}));


// ------------- Configure ejs and setting route to views -------------//////
app.set("view engine", "ejs"); //
app.set("views", path.join(__dirname, "views"));

// //-----------------------Static cacheing-------------------
// app.use(express.static('public', {
//     setHeaders: (res, path) => {
//         if (path.endsWith('.css')) {
//             res.set('Cache-Control', 'public, max-age=86400, immutable'); // Cache for 24 hours
//         }
//         if (path.endsWith('.jpg') || path.endsWith('.png')) {
//             res.set('Cache-Control', 'public, max-age=2592000, immutable'); // Cache images for 30 days
//         }
//     }
// }));
    

//---------------------templates-----------------
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// look into ejs and making "empty" html pages that hold includes from ejs

//-----------------------------Route------------------------


const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
// empty rn, comment out till updated


app.use('/', homeRoute);
app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);
// empty rn, comment out till updated

app.use(express.static(
    path.join(__dirname, 'public'), {

    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
        }

        if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.ico') || path.endsWith('.svg')) {
            res.set('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=30'); // Cache images for 30 days, can be stale for 30 seconds while it revalidates. 
        }
    }
}));

//======MONGODB Connection===========//

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected!');
    } catch (error){
        console.error('MOGO CONNECTION ERROR:', error);
        process.exit(1);
    }
}

// const graphs = [
//         {id: 1, filename: "Dashboard-piechart.png", alt: "A purple piechart"},
//         {id: 2, filename: "Dashboard-bargraph.png", alt: "a purple bar graph"},
//         {id: 3, filename: "Dashboard-linegraph.png", alt: "a purple line graph"},
//         {id: 4, filename: "Dashboard-percentage.png", alt: "a circular representation of a percentage"},
//         {id: 5, filename: "Dashboard-circlegraph.png", alt: "a circle graph"}
//     ];

// app.get("/graphs", (req,res)=>{
//     res.set('Cache-Control', 'max-age=300, stale-while-revalidate=60');
//     res.json(graphs);
// });

// app.get("/graphs/:id", (req, res) => {

//     const id = parseInt(req.params.id);

//     const graph = graphs.find(c => c.id === id);

//     if (!graph) {
//         return res.status(404).send("Not found");
//     }

//     res.set("Cache-Control", "public, max-age=300");

//     res.json(graph);
// });


//------------------------DATABASE CONNECT/QUERY------------
// const connection = require('connection.js');

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

// //--------------------VVV QUIRIES HERE VVV---------------------------

//   connection.query('',function (error, results, feilds){
//     if (error) throw error;
//   })

//   connection.end(); 
// });
// //------------------------ERROR HANDLING---------------------
// app.use((req, res) =>{
//     res.status(404).render("pages/404", { title: "Not found"});
// });


//-------------------------Key & Cert------------------------
const options = {
    key: fs.readFileSync('private-key.pem'), 
    cert: fs.readFileSync('certificate.pem'), 
};

//----------------------------Server creation-------------------
const httpsServer = https.createServer(options, app);


// ----------------------------Server start call---------------
httpsServer.listen(PORT_HTTPS, () => {
    connectDB();
    console.log(`HTTPS Server running at https://localhost:${PORT_HTTPS}`);
});