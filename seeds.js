var mongoose= require("mongoose");
var Campground= require("./models/campground");
var Comment= require("./models/comment");
var data=[{
    name:"Cloud's Rest",
    image:" https://www.haasjr.org/sites/default/files/styles/main_detail_image_narrow_1/public/community-grantees/RS1199_Campsite%20After.jpg?itok=CZrpmLQa",
    description:" you are one of them i have'nt visited"
},
{
    name:"Cloud's not belong to sky",
    image:" https://i.pinimg.com/originals/98/08/95/980895247da67b03e3c60e8b1dd27b3e.jpg",
    description:" you are one of them i have'nt visited"
},
]

function seedDB(){
    //REMOVE all campground
    Campground.remove({},function(err){
        if(err)
        console.log(err);
        else
        console.log("remove campgrounds!");
        // add a few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed,function(err,campground){
            if(err)
            console.log(err)
            else
            {
            console.log("added a campground");
            Comment.create(
                {
                    text: "blh blah blah",
                    author: "Homer"
                },function(err,comment){
                    if(err)
                    console.log(err);
                    else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }

                }
            )
            }
        });
      }) ;
});


}
module.exports=seedDB;