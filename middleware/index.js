var campgrounds=require("../models/campgrounds");
var Comment=require("../models/comments")


var middleware={}
//==============================
middleware.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
    return next();
}
req.flash("error","You need to login it!")
res.redirect("/login");
}

//=============================
middleware.checkCampground =function(req,res,next){
if(req.isAuthenticated())
{
    campgrounds.findById(req.params.id,function(err,foundcampground){
        if(err)
        res.redirect("back")
        else{
        if(foundcampground.author.id.equals(req.user.id))
        {next();
         }
        else{
            res.redirect("back");
        }    
    }

    });
    }
else
res.redirect("back")
};
//=============================
middleware.checkComment=function (req,res,next){
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err)
            res.redirect("back")
            else{
            if(foundcomment.author.id.equals(req.user.id))
            {next();
             }
            else{
                res.redirect("back");
            }    
        }
    
        });
        }
    else
    res.redirect("back")
    };

    module.exports=middleware;