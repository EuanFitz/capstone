"use strict";

// const authorize = (role) => {
//     return (req, res, next) =>{
//     if (req.user && req.user.role === role){
//         next();
//     } else{
//         res.status(403).json({ message: "Access Denied" });
//     }
//     };
// };

// module.exports = authorize;

// ------------------made to accept multiple roles.


const authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};

module.exports = authorize;
