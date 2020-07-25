var mongoose =require('mongoose');
var campgroundSchema=new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"

        },
        username:String

    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,       //In reference we pass model name
            ref:"Comment"                         
        }
    ]
});

module.exports=mongoose.model("campgrounds",campgroundSchema); //defining model
