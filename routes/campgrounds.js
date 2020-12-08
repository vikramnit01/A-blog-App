var express = require("express");
var router  =express.Router();
var passport = require("passport");
var Campground = require("../models/campground");
var middleware = require("../middleware") //we don't have to write ("../middleware/index.js")
// index is special name it work like homepage
// remove app by router
router.get("/",function(req,res){
    //get all campgrounds from data base
    Campground.find({},function(err,allCampgrounds){
        if(err)
        console.log(err);
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });
});
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and add to campgrond array
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var dis=req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground={name: name,price: price ,image: image, description:dis,author:author};
//create a new campgrounds and save t0 db
Campground.create(newCampground,function(err,newlyCreated){
    if(err)
    console.log(err)
    else
    res.redirect("/campgrounds");
});
    //redirect back to campgrounds page
   
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
  //find the campgrounded with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err)
      console.log(err);
      else{
          console.log(foundCampground);
      res.render("campgrounds/show",{campground:foundCampground});
      }
  });
});
// edit campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});
});
});

// upadte campground
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find upadte the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,upadtedCampground){
        if(err)
        res.redirect("/campgrounds");
        else
        res.redirect("/campgrounds/"+req.params.id); //or use updatedCampground.id
    })
})

//destroy campground

router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findOneAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/campgrounds");
        else
        res.redirect("/campgrounds");
    })
})

module.exports = router;