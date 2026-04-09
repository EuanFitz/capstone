const express = require('express');
const authorize = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const User = require("../model/User");

const { encrypt, decrypt } = require("../middleware/encryption");
// =============================
// ========== UPDATE INFO ======
// =============================

router.post('/update', authMiddleware, async (req, res) =>{
//Get form values from profile form 
try{
const { displayName, email, bio } = req.body;
const updates ={}
        if(displayName) updates.displayName = displayName;
        if(email) updates.email = encrypt(email);
        if(bio) updates.bio = encrypt(bio);

        await User.findByIdAndUpdate(req.user.id, updates, {returnDocument: 'after'});
        //Send status when it works
        res.status(201).json({ message: 'Update successful'}); 

//Error handling

}catch (error) { 
        //if it goes wrong log the error to the server 
        console.error("Error Updating:", error);
        res.status(500).json({ error: error.message });
  }
});

module.exports = router;
