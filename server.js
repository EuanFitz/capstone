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

//-----------------------------Route------------------------
// app.get('/secure', (req, res) => {
// res.sendFile(path.join(__dirname, 'pages', 'index.html'));
// });

app.use(express.static(
    path.join(__dirname, 'pages')));

app.use(express.static(
    path.join(__dirname, 'public'), {

    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.set('Cache-Control', 'public, max-age=86400, immutable'); // Cache for 24 hours
        }

        if (path.endsWith('.jpg') || path.endsWith('.png')) {
            res.set('Cache-Control', 'public, max-age=2592000, immutable'); // Cache images for 30 days
        }
    }
}));



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