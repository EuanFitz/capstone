require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const passport = require('./routes/passport');


const PORT_HTTPS = process.env.PORT || 3443; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
        "scriptSrcAttr": ["'none'"],
        "styleSrc": ["'self'",  "https://fonts.googleapis.com"], 
        "fontSrc": ["'self'", "https://fonts.gstatic.com"], 
        "imgSrc": ["'self'", "data:"], 
        "connectSrc": ["'self'", 'https://api.elevenlabs.io'],//vishing route test
        "formAction": ["'self'"], 
        "frameAncestors": ["'none'"],
        "objectSrc": ["'none'"],
        "baseUri": ["'self'"],
        "upgradeInsecureRequests": []

      },
    }
}));


// Initialize Passport and session
app.use(passport.initialize());



// ------------- Configure ejs and setting route to views -------------//////
app.set("view engine", "ejs"); //
app.set("views", path.join(__dirname, "views"));


//-----------------------------Route------------------------

const { doubleCsrfProtection, generateToken } = require('./middleware/csrf');
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/updateProfile");

const vishingRoute = require('./routes/vishing');// vishing route test

const cookieParser = require('cookie-parser'); // added for cookie use - RP


app.use(cookieParser()); // Do cookie things! -RP

// =============================
// ======== CREATE TOKEN =======
// =============================
app.get("/csrf-token", (req, res) => {
  const token = generateToken(req, res);
  res.json({ csrfToken: token });
});

app.use(doubleCsrfProtection); 
app.use('/', homeRoute);
app.use('/api/admin', adminRoute); // should be admin only!
app.use('/api/auth', authRoute);
app.use('/api/updateProfile', profileRoute); // should be when anyone is logged in.

app.use('/api/vishing', vishingRoute);// vishing route test
app.use('/audio', express.static(path.join(__dirname, 'output')));// vishing route test


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

// -----------------------404 handling------------------
app.use((req, res, next) => {
    res.status(404).send('Page not found');
    // This was done to fix OWASP ZAP CSP warning. Express's 404 handler runs outside our helmet setup unless we fix/customize it ourselves. - RP
});

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

const http = require('http');
const httpServer = http.createServer(app);
httpServer.listen(3001, () => {
    console.log('HTTP Server running at http://localhost:3001');
});