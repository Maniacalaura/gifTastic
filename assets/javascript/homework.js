//this function starts as soon the page loads
$(document).ready(function(){
    //when a button is pressed this function starts
    $('button').on('click', function(){
        var f = $(this).data('feeling');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+f+"&api_key=MxL6tgoRhc5ss8xjIztn5QhemdJZVMdc&limit=10&rating=g&rating=pg";
        //here we're linking to the giphy API and using &limit=10 &rating=g &rating=pg so only 10 gifs will load, and their ratings will be either g or pg.
        $.ajax({url: queryURL, method: "GET"})
        // this is our call back function, it says I'll come back and do this later, promise
        .done(function(response){

        console.log(response);

        //here we're going to cycle through the response we get from giphy
        for (var i = 0; i < response.data.length; i++) {
            //creating divs and paragraphs to put our reponses in
            var feelingDiv = $("<div>");
            var p = $("<p>");
            //displays the rating of the gif using dot notation 
            p.text("Rating: " +response.data[i].rating);
            //creating a var with image tags for our newly captured gifs
            var feelingImage = $("<img>");
            //adding attributes to the new var
            feelingImage.addClass("feel");
            //using dot notation we're specifying that we want our images in a fixed height and to appear still and not animated
            feelingImage.attr("src", response.data[i].images.fixed_height_still.url);

            feelingImage.attr("data-still", response.data[i].images.fixed_height_still.url);

            feelingImage.attr("data-animate", response.data[i].images.fixed_height.url);

            feelingImage.attr("data-state", "still");
            //this prepends the images to our paragraph and div tags so they show up on the top
            feelingDiv.prepend(p);

            feelingDiv.prepend(feelingImage);
            //this tells it where to display the images using a class from our html file
            $("#displayGif").prepend(feelingDiv);
        }
            //the following will grab our images and change their states based on clicks. It will load still beause we spcified that in the .attr above
            $(".feel").on("click", function(event){
            
                var state = $(this).attr("data-state");
        
                var src = $(this).attr("src");
                    //if the state is still when clicked, it will animate
                    if(state === "still"){
                    
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    //if the state is animated when clicked it will become still
                    } else {
                    
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
            });
        });
    });
        //here we'll add new buttons based on user input
        $("#addFeeling").on("click", function(){
            //this var will grab the value of the users input from the form
            var feelingButton = $("#feeling-input").val();
            //and make a button for it
            var addButton = $("<button>").css("margin-right", "4px");

            addButton.html(feelingButton);
            //displaying that button in the buttons div, at the end
            $("#buttons").append(addButton);
        //the following code is essencially the same as our first function, only applied to the new input
            queryURL = "https://api.giphy.com/v1/gifs/search?q="+feelingButton+"&api_key=MxL6tgoRhc5ss8xjIztn5QhemdJZVMdc&limit=10&rating=g&rating=pg";
            console.log(feelingButton);

            $.ajax({url: queryURL, method: "GET"})
        
            .done(function(response){
    
            for (var i = 0; i < response.data.length; i++) {
    
                var feelingDiv = $("<div>")
    
                var p = $("<p>");
                
                p.text("Rating: " +response.data[i].rating);
                
                var feelingImage = $("<img>");
    
                feelingImage.addClass("feel");
                
                feelingImage.attr("src", response.data[i].images.fixed_height_still.url);
    
                feelingImage.attr("data-still", response.data[i].images.fixed_height_still.url);
    
                feelingImage.attr("data-animate", response.data[i].images.fixed_height.url);
    
                feelingImage.attr("data-state", "still");
    
                feelingDiv.prepend(p);
    
                feelingDiv.prepend(feelingImage);
    
                $("#displayGif").prepend(feelingDiv);
            }
            
            $("img").on("click", function(event){
            
                var state = $(this).attr("data-state");
        
                var src = $(this).attr("src");
                
                    if(state === "animate"){
                    
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr('data-state', "still");
    
                    } else {
                    
                        $(this).attr('src', $(this).data("animate"));
                        $(this).attr('data-state', "animate");
                    }
                });
            });
            
            $("#feeling-input").val("");

            return false;

            

        })
            
});