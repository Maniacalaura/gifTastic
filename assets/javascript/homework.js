$(document).ready(function(){

    $('button').on('click', function(){
        
        var f = $(this).data('feeling');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+f+"&api_key=MxL6tgoRhc5ss8xjIztn5QhemdJZVMdc&limit=10&rating=g&rating=pg";

        $.ajax({url: queryURL, method: "GET"})
        
        .done(function(response){

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var feelingDiv = $("<div>");

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
        
            $(".feel").on("click", function(event){
            
                var state = $(this).attr("data-state");
        
                var src = $(this).attr("src");
                
                if(state === "still"){
                
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');

                } else {
                
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            });
        });
    });

    var feelings = [""];

        $("#addFeeling").on("click", function(){
            

            var feelingButton = $("#feeling-input").val();

            var addButton = $("<button>");

            addButton.attr("data-name", feelingButton);

            addButton.html(feelingButton);

            $("#buttons").append(addButton);

            queryURL = "https://api.giphy.com/v1/gifs/search?q="+feelingButton+"&api_key=MxL6tgoRhc5ss8xjIztn5QhemdJZVMdc&limit=10&rating=g&rating=pg";
            console.log(feelingButton);
            $.ajax({url: queryURL, method: "GET"})
        
            .done(function(response){
    
            for (var i = 0; i < response.data.length; i++) {
    
                var feelingDiv = $("<div>") //.attr("src", response.data[i].images.fixed_height_still.url);
    
                var p = $("<p>");
                
                p.text("Rating: " +response.data[i].rating);
                
                var feelingImage = $("<img>");
    
                feelingImage.addClass("feel");
                
                feelingImage.attr("src", response.data[i].images.fixed_height.url);
    
                feelingImage.attr("data-still", response.data[i].images.fixed_height_still.url);
    
                feelingImage.attr("data-animate", response.data[i].images.fixed_height.url);
    
                feelingImage.attr("data-state", "still");
    
                feelingDiv.prepend(p);
    
                feelingDiv.prepend(feelingImage);
    
                $("#displayGif").prepend(feelingDiv);
            }
            
                $(".feel").on("click", function(event){
                
                    var state = $(this).attr("data-state");
            
                    var src = $(this).attr("src");
                    
                    if(state === "still"){
                    
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
    
                    } else {
                    
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
            
            $("#feeling-input").val("");

            return false;

        })
            
});