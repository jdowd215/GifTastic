//USE CASES
//1.  User loads page, default sport buttons display, along with form allowing user to type additional
        //sports and submit to create new buttons
//2.  User clicks on button, and 10 GIFs are displayed on the page (along with rating).  GIFs are 
        //displayed via an AJAX call from giphy.com

    
var sports = ["baseball", "football", "basketball", "soccer"];

function renderButtons() {
    $("#addButton").empty();
    //for loop that iterates thru the array and creates buttons
    for (var i = 0; i < sports.length; i++) {

        var button = $("<button>");
        button.addClass("sports");
        button.attr("data-name", sports[i]);
        button.text(sports[i]);
        $("#addButton").append(button);
    }
    addGifs();
};

$("#addSport").on("click", function() {
    var sportAdd = $("#sport-input").val().trim();
    sports.push(sportAdd);
    renderButtons();

    if (sportAdd === " ") {
        $("#sport-input").val().trim();
    }
    else {
        return false
    }
    });

renderButtons();

function addGifs() {
    // Event listener for our sport buttons
    $("button").on("click", function() {

    // In this case, the "this" keyword refers to the button that was clicked
        var sport = $(this).data("name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=YxgwP4jNIVqw0T07jluh95MrRtCgmHqd&limit=10";
    
    // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

      // After the data from the AJAX request comes back
        .then(function(response) {

        //storing an array of results in the results variabl
        var results = response.data

        //looping over every result item
        for (var i = 0; i < results.length; i++) {

        //creating and storing a div for the gifs
        var gifDiv = $("<div class='item'>");

        //storing the result item's rating
        var rating = results[i].rating;

        //creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        //creating an image tag
        var sportGif = $("<img>");

        //giving the img tag a src attribute of a property from the result item 
        sportGif.attr("src", results[i].images.fixed_height_still.url);
        sportGif.attr("data-still", results[i].images.fixed_height_still.url);
        sportGif.attr("data-animate", results[i].images.fixed_height.url);
        sportGif.attr("data-state", results[i].images.fixed_height_still.url);

        //appending the paragraph and sportGif to the gifDiv
        gifDiv.append(p);
        gifDiv.append(sportGif);

        //prepending the gifDiv to the sport div in the HTML
        $("#sport").prepend(gifDiv);

        };

        $(".item").children("img").on("click", function() {
        
            var state = $(this).attr("data-state");

            if (state == "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } 
            else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });

        });
    });
}

