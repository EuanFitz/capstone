const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');
const app = express();
const PORT_HTTPS = 3443; 

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
        "scriptSrc": ["'self'"], 
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
const dashboardRoute = require("./routes/data");

app.use('/', homeRoute);
app.use('/dashboard', dashboardRoute);

app.use(express.static(
    path.join(__dirname, 'public'), {

    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
        }

        if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.ico') || path.endsWith('.svg')) {
            res.set('Cache-Control', 'public, max-age=2592000, stale-while-revaliadate=30'); // Cache images for 30 days, can be stale for 30 seconds while it revalidates. 
        }
    }
}));


//------------------------ERROR HANDLING---------------------
app.use((req, res) =>{
    res.status(404).render("pages/404", { title: "Not found"});
});


//-------------------------Key & Cert------------------------
const options = {
    key: fs.readFileSync('private-key.pem'), 
    cert: fs.readFileSync('certificate.pem'), 
};

//----------------------------Server creation-------------------
const httpsServer = https.createServer(options, app);


// ----------------------------Server start call---------------
httpsServer.listen(PORT_HTTPS, () => {
    console.log(`HTTPS Server running at https://localhost:${PORT_HTTPS}`);
});