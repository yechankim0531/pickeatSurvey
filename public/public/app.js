document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID
    var startButton = document.getElementById('startSurvey');
    
    // Add a click event listener to the button
    startButton.addEventListener('click', function() {
        // Redirect to the survey.html page when the button is clicked
        window.location.href = 'user.html';
    });
});