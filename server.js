const express = require('express');
const https = require('https');
const fs = require('fs');
const hsts = require('hsts'); // Import hsts for HSTS support

const app = express();
const PORT_HTTPS = 3000;


// Sample route for HTTPS
app.get('/secure', (req, res) => {
    res.send('Hello from HTTPS!');
});

// Apply HSTS middleware to the HTTPS server
const hstsOptions = {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Apply HSTS to all subdomains
    preload: true // Include this site in the HSTS preload list
};

// This part needs to be changed to communicate with middleware, certbot, and Let's Encrypt.

// // Create HTTPS server with SSL certificate
// const options = {
//     key: fs.readFileSync('path/to/private/key'), // Path to your private key
//     cert: fs.readFileSync('path/to/certificate'), // Path to your certificate
// };

// Create HTTPS server
const httpsServer = https.createServer(options, (req, res) => {
    // Apply HSTS middleware
    hsts(hstsOptions)(req, res, () => {
        app(req, res);
    });
});

// Start HTTPS server
httpsServer.listen(PORT_HTTPS, () => {
    console.log(`HTTPS Server running at https://localhost:${PORT_HTTPS}`);
}); 