const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config()



const jwtKey = process.env.JWT_SECRET;

//Route1 : Create user using POST ""/api/auth/createuser. No signup required
router.post('/createuser', [
    body('name' , 'Enter valid name').isLength({min : 3}),
    body('email' , 'Enter valid email').isEmail() ,
    body('password' , 'Enter valid password').isLength({min : 5})
] , async (req, res) => {
    
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    try { 
        let user = await User.findOne({email : req.body.email});
        if(user) {
            let success = false;
            return res.status(400).json({success,error : "Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password , salt)

        //creating user
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass
        });
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data, jwtKey);
        let success = true;
        res.json({success,authToken});

    } catch(error){
        console.log(error.message);
        res.status(500).send("Something went wrong");
    }
});


//Route2 : Authentication of the user without logging in : POST "/api/auth/login"
router.post('/login', [
    body('email' , 'Enter valid email').isEmail() ,
    body('password' , 'Password cannot be blank').exists() ,
] , async (req, res) => {

     //check for errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({errors : errors.array()});
     };

     const {email, password} = req.body;
     try {
        let user = await User.findOne({email});
        if(!user) {
            let success = false;
            return res.status(400).json({success , error : "Email not found"})
        }
       
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            let success = false;
            return res.status(400).json({success , error : "Invalid password"})
        }

        else {
            const payload = {
                user : {
                    id : user.id
                }
            }
            const authToken = jwt.sign(payload, jwtKey);
            let success = true;
            res.json({success , authToken});
        }
        
     }catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong Internally : " + error.message);
     }
})


//Route3 : get user information using POST on "/api/auth/getuser"
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error) {
        console.log(error.message);
        res.status(500).send("Something went wrong Internally : " + error.message);
    }
})
module.exports = router;