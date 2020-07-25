var express=require('express');
var router=express.Router();
var campgrounds=require('../models/campgrounds')
var middleware=require('../middleware/index')


router.get("/Campgrounds",function(req,res){
                
            //all campgrounds will rock you
        campgrounds.find({},function(err,allcampgrounds){


        if(err)
        console.log("phir lg lgye LLL");
        else
        res.render("campgrounds/index",{campgrounds:allcampgrounds});

        });
// res.render("campgrounds",{campgrounds:campgrounds});
});


router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){

res.render("campgrounds/new");
});

router.post("/Campgrounds",middleware.isLoggedIn,function(req,res){
var title=req.body.title;
var image=req.body.image;
var desc=req.body.description;
var author={
    id:req.user._id,
    username:req.user.username
}
var newcampground={title:title,image:image,description:desc,author:author};//you have already created the object just directly use it 

campgrounds.create(newcampground,function(err,newlist){

if(err)
console.log("something wrong while adding");
else
console.log(newlist)
res.redirect("/campgrounds");
});
});
router.get("/Campgrounds/:id",function(req,res){

campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundcampground){

if(err)
console.log(err);
else{
//console.log(foundcampground);
res.render("campgrounds/show",{ searchcampgrounds:foundcampground});
}
});
});

router.get("/Campgrounds/:id/edit",middleware.checkCampground,function(req,res){
campgrounds.findById(req.params.id,function(err,foundcampground){
    if(err){
    console.log(err)
    res.redirect('/Campgrounds')
    }
    else{
        res.render("campgrounds/edit",{campground:foundcampground})
    }
});


});
router.put("/Campgrounds/:id",middleware.checkCampground,function(req,res){

    newdata={
        title:req.body.title,
        image:req.body.image,
        description:req.body.description
    }
    campgrounds.findByIdAndUpdate(req.params.id,newdata,function(err,updateddata){

    if(err)
    {console.log(err);
    }
    else{
        res.redirect("/Campgrounds/"+ req.params.id);
    }
    });
});
router.delete("/Campgrounds/:id",middleware.checkCampground,function(req,res){

    campgrounds.findOneAndDelete(req.params.id,function(err,respone){

        if(err)
        console.log(err);
        else{
            res.redirect("/Campgrounds/");
        }
    });
});


module.exports=router;