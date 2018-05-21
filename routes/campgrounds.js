var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});

router.get("/adventureous" , function(req , res){
    Campground.find({category :"Adventureous"}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/adventureous",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});

router.get("/mountains" , function(req , res){
    Campground.find({category :"Mountain"}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/mountains",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});

router.get("/religious" , function(req , res){
    Campground.find({category :"Religious"}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/adventureous",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});

router.get("/historic" , function(req , res){
    Campground.find({category :"Historic"}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/adventureous",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});


router.get("/haunted" , function(req , res){
    Campground.find({category :"Haunted"}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/adventureous",{campgrounds:allCampgrounds , currentUser: req.user});
       }
    });
});



//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn , function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image1 = req.body.image1;
    var image2 = req.body.image2;
    var image3 = req.body.image3;
    var image4 = req.body.image4;
    var desc = req.body.description;
    var cat = req.body.selectCat;
    var days = req.body.days;
    var nights = req.body.nights;
    var author = {
            id : req.user._id,
            username : req.user.username,
            email : req.user.email,
            mobile : req.user.mobile,
            address : req.user.address,
            image : req.user.image
    };
    var newCampground = {name: name, image1: image1, image2: image2 , image3: image3 , image4: image4 ,  description: desc, category: cat , days : days , nights : nights , author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn , function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//edit route
router.get("/:id/edit" ,  middleware.checkCampgroundOwnership , function(req , res ){
         Campground.findById(req.params.id , function(err , foundCampground){
                res.render("campgrounds/edit", {campground : foundCampground});
         });       
});

//update route
router.put("/:id" , middleware.checkCampgroundOwnership , function(req , res ){
        Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , updatedCampground){
                if(err){
                    res.redirect("/campgrounds");
                } else{
                    req.flash("success" , "Campground is Updated");
                    res.redirect("/campgrounds/" + req.params.id);
                }
        });
});

//delete
router.delete("/:id" , middleware.checkCampgroundOwnership , function(req , res ){
        Campground.findByIdAndRemove(req.params.id , function(err){
                if(err){
                        res.redirect("/campgrounds");
                } else {
                        req.flash("success" , "Campground deleted");
                        res.redirect("/campgrounds");
                }
        });
});


module.exports = router;