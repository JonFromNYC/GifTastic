$('document').ready(function(){

    // Variables

    var basicEmotions = ['fear', 'anger', 'sadness', 'joy', 'disgust', 'surprise', 'trust', 'anticipation'];
    // var queryURL = 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';


    // new div under nav bar to hold a row of buttons
    var newDiv = $('<div>');                    // New div element
    newDiv.addClass('button-holder');           // Add class to new Div
    $('#nav-bar').append(newDiv);

    // make initial list of buttons for each element in the basic emotions array
    function startButtons(){
        console.log('startButtons() called');
        
        for (let i = 0; i < basicEmotions.length; i++) {
            var newBtn = $('<button>');                 // New button element
            newBtn.addClass('btn btn-sm btn-primary');  // Add class to button
            newBtn.attr('data-emo', basicEmotions[i]);  // Add data attribute to button equal to array index
            newBtn.text(basicEmotions[i]);              // Add text to the button equal to array index
            newDiv.append(newBtn);                      // Append newBtn to newDiv
        }

/*      var newDiv = $('<div>');                    // New div element
        newDiv.addClass('button-holder');           // Add class to new Div
        var newBtn = $('<button>');                 // New button element
        newBtn.addClass('btn btn-sm btn-primary');  // Add class to button
        newBtn.attr('data-emo', basicEmotions[0]);  // Add data attribute to button equal to array index
        newBtn.text(basicEmotions[0]);              // Add text to the button equal to array index
        newDiv.append(newBtn);                      // Append newBtn to newDiv
        $('#nav-bar').append(newDiv);               // Append new elements to #nav-bar 
*/

    } // End of startButtons()

    // call startButtons()
    startButtons();
    //makeCard();

    $(".btn-primary").on("click", function(event) {
        console.log('primary button clicked');
        
        event.preventDefault();

        var getEmotion = $(this).data('emo'); 
        console.log(getEmotion);
        
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + getEmotion + '&api_key=dc6zaTOxFJmzC&limit=10'; 

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.warn("Ajax was called");  
          console.log(queryURL);
          console.log(response);
          
          var results = response.data;

          var newEmotionDiv = $("<div>");
          newEmotionDiv.addClass('emotion-holder');
          // Looping through each result item
          for (var i = 0; i < results.length; i++) 
          {
            var p = $("<p>").text("Rating: " + results[i].rating);
            var emotionImage = $("<img>");
            emotionImage.attr("src", results[i].images.fixed_height.url);
            newEmotionDiv.append(p);
            newEmotionDiv.append(emotionImage);
            $("#gifs-appear-here").prepend(newEmotionDiv);
          }
        });

      });
});