function renderButtons(){

    var feelings = [];

    $('button').on('click', function(){
        var f = $(this).data('feeling');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+f+"&api_key=MxL6tgoRhc5ss8xjIztn5QhemdJZVMdc&limit=10&rating=g&rating=pg";

        $.ajax({url: queryURL, method: "GET"})
        .done(function(response){

        for (var i = 0; i < response.data.length; i++) {

            var feelingDiv = $("<div>");

            var p = $("<p>").text("Rating: " +response.data[i].rating);
            
            var feelingImage = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);

            $("img").addClass("playing", response.data[i].images.fixed_height_still.url);

            feelingDiv.prepend(p);

            feelingDiv.prepend(feelingImage);

            $("#displayGif").prepend(feelingDiv);

        }
        $("img").on("click", function(event){
        
            var state = $(this).attr('data-state');
    
            var src = $(this).attr("src");
            
            if($(this).hasClass("playing")){
               
               $(this).attr("src", src.replace(".gif","_s.gif"))
               $(this).removeClass("playing");
            } else {
              
              $(this).addClass("playing");
              $(this).attr("src", src.replace("_s.gif", ".gif"))
            }
    
        })
    })

    $("#add-feeling").on("click", function(event){

        event.preventDefault();

        var a =$("<button>");

        var feeling = $("#feeling-input").val().trim();

        feelings.push(a);

        renderButtons();
    })

        }
    )}
renderButtons();