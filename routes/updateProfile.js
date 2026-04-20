const express = require("express");
const authorize = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const User = require("../model/User");
const argon2 = require("argon2");
const { encrypt } = require("../middleware/encryption");

// =============================
// ========== UPDATE INFO ======
// =============================

router.post('/update', authMiddleware, async (req, res) =>{
//Get form values from profile form 
try{
const { displayName, email, bio } = req.body;

//Check if the value exists before updating profile
const updates = {}
        if(displayName) updates.displayName = displayName;
        if(email) updates.email = encrypt(email);
        if(bio) updates.bio = encrypt(bio);

        await User.findByIdAndUpdate(req.user.id, updates, {returnDocument: 'after'});
        //Send status when it works
        res.status(200).json({ message: 'Update successful'}); 

//Error handling

}catch (error) { 
        //if it goes wrong log the error to the server 
        console.error("Error Updating:", error);
        res.status(500).json({ error: "Internal server error" });
  }
});


// =============================
// ====== Change Password ======
// =============================

router.post('/newPassword', authMiddleware, async (req, res) =>{
//Get form values from profile form 
try{
const { currentPassword, newPassword } = req.body;

//check if currentPassword matches
        const user = await User.findById(req.user.id)
        if (!user)
        return res.status(400).json({message: "User not found"});

        const isMatch = await argon2.verify(user.password, currentPassword);
                if (!isMatch)
                return res.status(400).json({ message: "Invalid Credentials" });

        //Hash new password
               user.password = await argon2.hash(newPassword);
        //update the database
               await user.save();
        //Send status when it works
        res.status(200).json({ message: 'Password Changed'}); 
//Error handling
}catch (error) { 
        //if it goes wrong log the error to the server 
        console.error("Error Updating:", error);
        res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
