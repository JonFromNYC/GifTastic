$('document').ready(function(){

    // Variables

    var basicEmotions = ['fear', 'anger', 'sadness', 'joy', 'disgust', 'surprise', 'trust', 'anticipation'];
    var queryURL = 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';


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

    function makeCard(){
/*         
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">Rating Here</p>
            <p class="card-text">Extra Stuff Here</p>
        </div>
    </div> */

        /* var newCardElement = $('
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap">
                                        <div class="card-body">
                                            <p class="card-text">Rating Here</p>
                                            <p class="card-text">Extra Stuff Here</p>
                                        </div>
                                </div>'); */
        var newCardElement = $('<div>').addClass('card').attr('style','width: 18rem');
        $('#nav-bar').append(newCardElement);
    }
    // call startButtons()
    startButtons();
    //makeCard();

    // call to Api using Ajax
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.warn("Ajax was called");  //~JG Fires when clicked or onkeyup
        console.log(response);            // Show the object in the console
        
      });
});