const express = require('express');
const https = require('https');
const fs = require('fs');
const http = require('http');

const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT_HTTP = 3000; 
const PORT_HTTPS = 3443; 

// // Sample route for HTTP
// app.get('/', (req, res) => {
//     res.send('Hello from HTTP!');
// });

app.use(helmet());

// Serve static files (images, CSS, JS) with caching
app.use('/static', express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.set('Cache-Control', 'public, max-age=86400, immutable'); // Cache for 24 hours
        }
        if (path.endsWith('.jpg') || path.endsWith('.png')) {
            res.set('Cache-Control', 'public, max-age=2592000, immutable'); // Cache images for 30 days
        }
    }
}));

// Sample route for HTTPS
app.get('/secure', (req, res) => {
res.sendFile(path.join(__dirname, 'pages', 'faq.html'));
    // res.send('Hello from HTTPS!');
});



// // Apply HSTS middleware to the HTTPS server
// const hstsOptions = {
//     maxAge: 31536000, 
//     includeSubDomains: true,
//     preload: true 
// };  

// // Create HTTP server
// http.createServer(app).listen(PORT_HTTP, () => {
//     console.log(`HTTP Server running at http://localhost:${PORT_HTTP}`);
// });

// Create HTTPS server with SSL certificate
const options = {
    key: fs.readFileSync('private-key.pem'), 
    cert: fs.readFileSync('certificate.pem'), 
};

// Create HTTPS server
const httpsServer = https.createServer(options, (req, res) => {

    hsts(hstsOptions)(req, res, () => {
        app(req, res);
    });
});

// Start HTTPS server
httpsServer.listen(PORT_HTTPS, () => {
    console.log(`HTTPS Server running at https://localhost:${PORT_HTTPS}/secure`);
});