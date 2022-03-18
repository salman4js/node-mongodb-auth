const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwt = require("jsonwebtoken");


const signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashed){
        if(err){
            res.send(err)
        }
        let user = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashed
        })
        user.save()
        .then(user => {
            res.send("User Added Successfully!")
        })
        .catch(error => {
            res.send("Error Occured" + error)
        })
    })
}

const login = (req,res,next) => {
    username = req.body.username
    password = req.body.password

    User.findOne({$or : [{email : username}, {username : username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.send("Some Stupid Error on Login Session")
                }
                if(result){
                    let token = jsonwt.sign({name : user.name}, "verySecretValue", {expiresIn : '1h'})
                    res.json({
                        message : "Login Succesfull",
                        token
                    })
                } else {
                    res.send("Password doesn't match!")
                }
            })
        } else {
            res.send("No user has been found")
        }
    })
}

const checking = (req,res,next) => {
    User.find({})
    .then(data => {
        console.log(data);
        res.send(data)
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    signin, login, checking
}