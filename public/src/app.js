var startButton = document.getElementById('startSurvey');
var nextBtn = document.getElementById('nextBtn');


document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID
    
    
    // Add a click event listener to the button
    startButton.addEventListener('click', function() {
        // Redirect to the survey.html page when the button is clicked
        window.location.href = 'user.html';
        
    });

});


document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID


    nextBtn.addEventListener('click', function() {
        // Redirect to the survey.html page when the button is clicked
        window.location.href = 'question.html';
       
    });
});
