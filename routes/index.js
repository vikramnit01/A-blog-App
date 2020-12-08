var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    =require("../models/user");


router.get("/",function(req,res){
    res.render("landing");
});
 //====================================
 //Auth route
 // show register form
 router.get("/register",function(req,res){
     res.render("register");
 })
 //handle sign up route
 router.post("/register",function(req,res){
  var newUser = new User({username:req.body.username});          //collect new user by passport user
  User.register(newUser, req.body.password, function(err,user){
      if(err){
          console.log(err);
      req.flash("error",err.message);
      return res.render("register");
      }
      passport.authenticate("local")(req,res,function(){  //for logged in
        req.flash("success","Welcome to yelpCamp " + user.username);
        res.redirect("/campgrounds");
      });
  });
 });
//=========== login also require two route
router.get("/login",function(req,res){
    res.render("login");
});
//handling login logic 
// app.post("/login",middleware,callback)
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){

});  
//====== logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
})

module.exports= router;