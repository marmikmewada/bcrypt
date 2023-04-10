const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../server/users.js");

router.post("/signup", async (req,res)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword});
    //checking if user already exists

    const alreadyuser = await User.findOne({email:email});
    if(alreadyuser){
       return res.status(400).send("user already is a member, please login");
    }else{
        
    //adding user to db
    try{
        await user.save();
        res.status(201).send("user created successfully");
    }catch(err){
        console.log(err);
        res.send(400).send("error creating user");
    }
    }

});

module.exports = router;
