const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config  = require('config');
const User = require('../../models/User');

// @route   GET api/users
// @desc    test route
// @access  Public
router.get('/', (req, res) => {
    res.send('Users GET route');
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/register', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password } = req.body;

    try {
        //See if user exists in the database
        let userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({errors: [ {msg: "User already exists"} ]});
        }

        //Get user's gravatar
        const avatar = gravatar.url(email, {
            s: 200,
            r: 'pg',
            d: 'mm'
        });
        // Encrypt pw 
        const salt = await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(password, salt);

        //Create new user into mongodb
        user = new User({
            name,
            email,
            avatar,
            password: hashedPass
        });

        await user.save();
        // res.send('User successfully registered!');
        // Return jwt to login right away
        // Sign, pass payload
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('accessToken'), 
        { expiresIn: 3600 } ,
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch(err){
        console.error(err.message);
        res.status(500).send
    }

    
});

module.exports = router;