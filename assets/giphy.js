$(document).ready(function() {

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);

      }}
  
    var topics = ["coding", "hacking", "javascript", "computer", "html", "server"];

function displayGifs() {
  var code = $(this).attr("data-name"); 

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + code + "&api_key=fAVWzvZMdVTqHvHOHtmziWXuFAtqWCt1&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
      .then(function (response) {

        var results = response.data; 

        for (var i = 0; i < results.length; i++) {

            var codeDiv = $("<div class='code'>");
            var ratings = $("<p>").text("Rating: " + results[i].rating);
            var image = $("<img>");

            image.attr("src", results[i].images.fixed_height_small_still.url);
            image.attr("data-still",  results[i].images.fixed_height_small_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state" , "still");
            image.addClass("code");

            codeDiv.append(ratings);
            codeDiv.prepend(image);

            $("#gif-view").prepend(codeDiv); 
        }      
    });
}
    function displayButtons() {
        $("#buttons-view").empty();

        for (var b = 0; b < topics.length; b++) {
            var a = $("<button>");
            a.addClass("giphyButton");
            a.attr("data-name", topics[b]);
            a.text(topics[b]);
            $("#buttons-view").append(a);
    }}

    $("#addCode").on("click", function(event) {

        event.preventDefault();

        var giphyAdd = $("#codingInput").val().trim();
        
        topics.push(giphyAdd);
        displayButtons();
});

    $("#buttons-view").on("click", function(event) {
        event.preventDefault();
        $("#gif-view").empty();
});

    $(document).on("click", ".code", function() {

        var position = $(this).attr("data-state");

        if (position === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
  }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
  }
});

displayButtons();

$(document).on("click", ".giphyButton", displayGifs);
})