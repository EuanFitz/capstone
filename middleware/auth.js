// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");
//   if (!token) return res.status(401).json({ message: "No token authorized" });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;  


//------------------------------Version 2: grabs id and role of user, wont crash if header missing.
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   // Guard: header missing entirely
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;

// ----------------------------Version 3: Using cookies for the security headers. previously relying on client js to authn. bad habit.- RP
const jwt = require("jsonwebtoken");
// Gentlement, please install cookie parser :) - RP :   npm install cookie-parser
const cookieParser = require("cookie-parser"); 
 
const authMiddleware = (req, res, next) => {
  // Checks cookie first, then uses security header if doesn't work/no cookie/ other issues etc. 
  const token = req.cookies?.token || 
    (req.header("Authorization")?.replace("Bearer ", ""));
 
  if (!token) {
    // redirect instead of JSON for page routes now.
    return res.redirect('/login'); 
  }
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
 
module.exports = authMiddleware;
 
