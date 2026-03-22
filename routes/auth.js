"use strict";
const express = require('express');
const argon2 = require('argon2');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('./passport');


    
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
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" },
        );
        
        //JWT Save to cookie 
        res.cookie('token', token, {
            httpOnly: true,  
            secure: true,
            sameSite: 'strict', 
            maxAge: 3600
        });
        
        //login successful message
        res.status(200).json({ message: `${username} Login Successful`, token });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
});

// =============================
// ========== GOOGLE ===========
// =============================

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));
        
router.get('/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: '/login'}),
        (req, res) => {
        // Give JWT
        const token = jwt.sign(
                { id: req.user._id, role: req.user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" },
        );

        //JWT Save to cookie 
        res.cookie('token', token, {
            httpOnly: true,  
            secure: true,
            sameSite: 'strict', 
            maxAge: 3600
        });

        //Say it worked
        res.status(200).json({ message: `${username} logged in succesfuly.`})
        res.redirect("/success");
        }


);


module.exports = router;