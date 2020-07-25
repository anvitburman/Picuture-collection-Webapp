var express=require('express')
var router=express.Router({mergeParams:true});
var Comment=require('../models/comments')
var campgrounds=require('../models/campgrounds')
var middleware=require('../middleware/index')

router.get('/Campgrounds/:id/comments/new',middleware.isLoggedIn,function(req,res){
    campgrounds.findById(req.params.id,function(err,campground){
    if(err)
    console.log(err)
    else{
    res.render("comments/new",{campground:campground});
    }
    })
    
    });
    
    router.post('/Campgrounds/:id/comments',middleware.isLoggedIn,function(req,res){
    
    campgrounds.findById(req.params.id,function(err,campground){
    if(err)
    console.log(err)
    else{
    var newcomment={
    text:req.body.text,
    author:req.body.author
    }
    Comment.create(newcomment,function(err,comment){
    
    if(err)
    console.log(err);
    else{
       comment.author.id=req.user._id;
       comment.author.username=req.user.username;
       comment.save();


    campground.comments.push(comment);
    campground.save();
    console.log(comment)
    res.redirect('/Campgrounds/'+campground._id);
    
    
    }
    });
    }
    });
    });
//==============
// comment edit routes
//==============
    router.get("/Campgrounds/:id/comments/:comment_id/edit",middleware.checkComment,function(req,res){
        Comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err)
            res.redirect("back")
            else{
                res.render("comments/edit",{campground_id :req.params.id,comment:foundcomment})
            }
        
        })
    });

    router.put("/Campgrounds/:id/comments/:comment_id",middleware.checkComment,function(req,res){
        var newdata=
        {
            text:req.body.text
        }
        Comment.findByIdAndUpdate(req.params.comment_id,newdata ,{new: true},function(err,UC){

            if(err)
            console.log(err)
            else{
                
                res.redirect("/Campgrounds/"+req.params.id);
            }
        });
    });
    //=============
    //comment delete 
    //=============
    router.delete("/Campgrounds/:id/comments/:comment_id",middleware.checkComment,function(req,res){
        Comment.findByIdAndRemove(req.params.comment_id,function(err,delData){
            if(err)
            res.redirect("back")
            else
            res.redirect("/Campgrounds/"+req.params.id);
        })
    });
 
    
    module.exports=router;