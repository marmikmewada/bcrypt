const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./users")
const signup = require("../api/signup");
const login = require("../api/login");
const profile = require("../api/profile");
app.use(express.json());
app.set("secretKey", "secretkey");

app.use("/", signup);
app.use("/", login);
app.use("/", profile);
app.get("/", (req,res)=>{
    res.send("<h1>server on</h1>")
})
async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb+srv://marmik:jinal@test.008ok8z.mongodb.net/udemy?retryWrites=true&w=majority");
      console.log("db ready");
    } catch (error) {
      console.error("db error:", error);
    }
  }
  
  connectToDatabase();
app.listen(3000, ()=>{
    console.log("server running");

})
