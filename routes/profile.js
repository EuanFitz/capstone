const express = require('express');
const authorize = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const { encrypt, decrypt } = require("../middleware/encryption");
// =============================
// ========== UPDATE INFO ======
// =============================

router.post('/update', async (req, res) =>{
//Get form values from profile form 
try{
const { displayName, email, bio } = req.body;

        await User.findByIdAndUpdate(req.user._id,{
                displayName: displayName ? displayName: null,
                email: email ? encrypt(email): null,
                bio: bio ? encrypt(bio): null
        });

        //Send status when it works
        res.status(201).json({ message: 'Update successful'}); 

//Error handling

}catch (error) { 
        //if it goes wrong log the error to the server 
        res.status(500).json({ error: error.message });
  }
});

module.exports = router;
