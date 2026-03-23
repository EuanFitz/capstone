require('dotenv').config(); // Adding here to test if fixes token reading issues - rp
// npm install dotenv

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
        "styleSrc": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], 
        "fontSrc": ["'self'", "https://fonts.gstatic.com"], 
        "imgSrc": ["'self'", "data:"], 
        "upgradeInsecureRequests": [],
        // "requireTrustedTypesFor": ["'script'"],

      },
    }
}));


// ------------- Configure ejs and setting route to views -------------//////
app.set("view engine", "ejs"); //
app.set("views", path.join(__dirname, "views"));


//-----------------------------Route------------------------


const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const cookieParser = require('cookie-parser'); // added for cookie use - RP


app.use(cookieParser()); // Do cookie things! -RP
app.use('/', homeRoute);
app.use('/api/admin', adminRoute); // should be admin only!
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute); // should be when anyone is logged in.


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