var mongoose     = require('mongoose'),
    campgrounds  =require('./models/campgrounds.js'),
    Comment      =require('./models/comments.js');


    var data=[
    {
        title:"smart peo",
        image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507441722a7ad6934dc5_340.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem"
    },
    {
        title:"handsome",
        image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794e702e79d0974d_340.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem "
    },
    {
        title:"charming",
        image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507441722a7ad6934dc5_340.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem "
    }
]
    
    function seedDB(){
    campgrounds.deleteMany({},function(err){
        if(err)
        console.log(err);
        else
       console.log("removed")
    //    data.forEach(function(seed){
    //     campgrounds.create(seed,function(err,campground){
    //             if(err)
    //                 console.log(err)
    //             else
    //             { console.log("Added camp");
    //                 Comment.create({
    //                     text:"this is a foolish text",
    //                     author:"mark zukerberg" 
    //         },function(err,cmt){
    //             if(err)
    //             console.log(err)
    //             else
    //             {
    //                 campground.comments.push(cmt);
    //                 campground.save();
    //                 console.log("cmt added")
    //             }

    
    //         });
    //     }
    //     });
    
    // });
    });
    
}
module.exports=seedDB;