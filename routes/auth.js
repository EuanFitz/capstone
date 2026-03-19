"use strict";
const express = require('express');
const argon2 = require('argon2');

const jwt = require('jsonwebtoken');
const router = express.Router();


// =============================
// ==========REGISTER===========
// =============================


//Get form values from adminregister.ejs 
const { username, password, role } = req.body;
//Check if username already exists
const [exists] = await.db.query(`SELECT * FROM users WHERE username = ?,`[username]);
if(exists.length > 0){
    res.status(409).json({ message: "Username already exists"});
}

const hashedPassword = await argon2.hash(password);
//Hash the password
//Create new User
//Put it somewhere

//Error handling



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