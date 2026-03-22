"use strict";
const express = require('express');
const argon2 = require('argon2');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const router = express.Router();


    
    // =============================
    // ==========REGISTER===========
    // =============================

router.post('/register', async (req, res) =>{
//Get form values from adminregister.ejs 
try{
const { username, password, role } = req.body;

//Hash the password
const hashedPassword = await argon2.hash(password);

//Create new User

const newUser = new User({username, password:hashedPassword, role});
//Put it somewhere
        await newUser.save();

        //Send status when it works
        res.status(201).json({ message: 'User created successfully' }); 

//Error handling

}catch (error) { 
        //if it goes wrong log the error to the server 
        res.status(500).json({ error: error.message });
  }
});

// =============================
// ============LOGIN============
// =============================

//Get form values from admin.ejs
router.post('/login', async (req, res) =>{
        try{
                const { username, password} = req.body;
        //Check if username exists
        const user = await User.findOne({ username });
        //error if !user
        if (!user)
        return res.status(400).json({ message: `${username} not found` });
        //if user exists check if passwords match using argon2
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch)
        //if not match "Password doesn't match"
        return res.status(400).json({ message: "Invalid Credentials" });
        //if match next()
        //Assign jwt
        const token = jwt.sign(
                { id: user._id, role: user.role, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" },
        );

        //-------Adding cookie code ------ -RP
        res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 // An hour.
        });
        
        //login successful message
    res.status(200).json({ message: `${username} Login Successful` });
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
module.exports = router;