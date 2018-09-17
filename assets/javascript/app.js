//USE CASES
//1.  User loads page, default sport buttons display, along with form allowing user to type additional
        //sports and submit to create new buttons
//2.  User clicks on button, and 10 GIFs are displayed on the page (along with rating).  GIFs are 
        //displayed via an AJAX call from giphy.com


    // Event listener for our sport buttons
    $("#sportButtons").on("click", function() {

    // In this case, the "this" keyword refers to the button that was clicked
        var sport = $(this).attr("sportButtons");

    // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=YxgwP4jNIVqw0T07jluh95MrRtCgmHqd&limit=10";
    
    // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        });
    




    })