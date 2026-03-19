"use strict";
const express = require('express');
const argon2 = require('argon2');

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
//Check if username exists
//error if !user
//if user exists check if passwords match using argon2
//if match next()
//if not match "Password doesn't match"
//Assign jwt
//login successful message


module.exports = router;