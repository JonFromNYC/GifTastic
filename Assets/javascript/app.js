$('document').ready(function () {

    // HOLD 8 EMOTIONS IN AN ARRAY TO BE USED FOR BUTTON TEXT
    var basicEmotions = ['fear', 'anger', 'sadness', 'joy', 'disgust', 'surprise', 'trust', 'anticipation'];
    
    var somethingNew;                                                   // HOLDS USER INPUT AS STRING
    var newDiv = $('<div>');                                            // NEW DIV ELEMENT

    begin();
    startButtons();

    // Input Listerner - Listens for when the user types value
    $('.my-sm-0').on('click', function (event) {
        event.preventDefault();                                         // PREVENT THE PAGE FROM RELOADING
        somethingNew = $('.mr-sm-2').val().trim();                      // Get user input
        basicEmotions.push(somethingNew);                               // ADD INPUT TO ARRAY
        startButtons();                                                 // REMAKE ALL THE BUTTONS
        $('#something-new').val(' ');                                   // CLEAR THE TEXT INPUT FIELD
    });

    // MAKE A NEW DIV UNDER NAV BAR TO HOLD A ROW OF 8 BUTTONS
    function begin(){
        newDiv.addClass('button-holder');                               // ADD CLASS TO NEW DIV
        $('#nav-bar').append(newDiv);                                   // APPEND THE NEW DIV TO NAV BAR
    }

    // FUNCTION: make initial list of buttons for each element in the basic emotions array
    function startButtons() {
        
        $('.button-holder').empty();                                    // Clear the .button-holder

        for (let i = 0; i < basicEmotions.length; i++) {                // For-Loop, adds a button for each array element
            var newBtn = $('<button>');                                 // NEW BUTTON ELEMENT
            newBtn.addClass('btn btn-sm btn-primary');                  // ADD CLASS TO BUTTON
            newBtn.attr('data-emo', basicEmotions[i]);                  // ADD DATA ATTRIBUTE
            newBtn.text(basicEmotions[i]);                              // ADD TEXT TO BUTTON
            newBtn.attr('style', "margin: 1px");                        // ADD STYLE
            newDiv.append(newBtn);                                      // APPEND newBtn TO newDiv
        }

        // BUTTON LISTENER - buttons & input
        $(".btn-primary").on("click", function (event) {

            event.preventDefault();                                     // PREVENT PAGE RELOAD

            var getEmotion = $(this).data('emo');                       // PASS THIS INTO API

            var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
                getEmotion + '&api_key=dc6zaTOxFJmzC&limit=10';

            $.ajax({                                                    // CALL AJAX
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var results = response.data;                            // VAR TO INTERACT WITH RESPONSE
                var newEmotionDiv = $("<div>");                         // NEW DIV TO PUT API RESULTS
                newEmotionDiv.addClass('emotion-holder');               // ADD CLASS TO NEW DIV

                /* LOOP TO ADD EACH GIPHY TO THE WEBPAGE PRINTS RATING AND THE EMOTION */
                for (var i = 0; i < results.length; i++) {
                    var p = $("<p>").text("Rated: " + results[i].rating + ' for ' + getEmotion);
                    var emotionImage = $("<img>");
                    emotionImage.attr("src", results[i].images.fixed_height.url);
                    newEmotionDiv.append(p);
                    newEmotionDiv.append(emotionImage);
                    $("#gifs-appear-here").prepend(newEmotionDiv);
                }
            });
        }); // END OF BUTTON LISTENER
    } // END OF startButtons() FUNCTION
}); // END OF PROGRAM