var express=require('express')
var router=express.Router();
var passport=require('passport')
var User=require('../models/user')

router.get('/',function(req,res){

    res.render("landing");
});

//===============
router.get('/register',function(req,res){
    res.render("register");
});
router.post('/register',function(req,res){
  
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    
        if(err)
        { 
            console.log(err);
           
        res.redirect("register")
    }
    else{
        passport.authenticate("local")(req,res,function(){
            res.redirect('/Campgrounds');
        })

    }
    });
});
router.get('/login',function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    successRedirect:"/Campgrounds"
}),function(req,res){

});

router.get('/logout',function(req,res){
    req.logout();
   req.flash("success","you have been logged out");
    res.redirect("/Campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
    return next();
}
res.redirect("/login");
}
module.exports=router;