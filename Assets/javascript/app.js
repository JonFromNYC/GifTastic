$('document').ready(function () {

    // HOLD 8 EMOTIONS IN AN ARRAY TO BE USED FOR BUTTON TEXT
    var basicEmotions = ['fear', 'anger', 'sadness', 'joy', 'disgust', 'surprise', 'trust', 'anticipation'];

    // MAKE A NEW DIV UNDER NAV BAR TO HOLD A ROW OF 8 BUTTONS
    var newDiv = $('<div>');                                // NEW DIV ELEMENT
    newDiv.addClass('button-holder');                       // ADD CLASS TO NEW DIV
    $('#nav-bar').append(newDiv);                           // APPEND THE NEW DIV TO NAV BAR

    startButtons();

    // FUNCTION: make initial list of buttons for each element in the basic emotions array
    function startButtons() {
        for (let i = 0; i < basicEmotions.length; i++) {
            var newBtn = $('<button>');                     // New button element
            newBtn.addClass('btn btn-sm btn-primary');      // Add class to button
            newBtn.attr('data-emo', basicEmotions[i]);      // Add data attribute to button equal to array index
            newBtn.text(basicEmotions[i]);                  // Add text to the button equal to array index
            newDiv.append(newBtn);                          // Append newBtn to newDiv
        }
    } // End of startButtons()

    // BUTTON LISTENER
    $(".btn").on("click", function (event) {

        event.preventDefault();

        var getEmotion = $(this).data('emo');

        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + getEmotion + '&api_key=dc6zaTOxFJmzC&limit=10';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.warn("Ajax was called");
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            var newEmotionDiv = $("<div>");
            newEmotionDiv.addClass('emotion-holder');
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
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