$(document).ready(function() {
    var form = $("#registrationForm");
    var submitButton = $("#submitButton");

    form.on("submit", function(event) {
        event.preventDefault(); 

        var username = $("#username").val();
        var password = $("#password").val();
      
        var errors = [];

        // Clear previous error messages
        $(".error-message").remove();

        // Validate username
        if (username.length < 5) {
            errors.push("Please enter a username of at least 5 characters.");
            displayError("username", "Please enter a username of at least 5 characters.");
        }

        // Validate password
        if (password.length < 1) {
            errors.push("Please enter a password.");
            displayError("password", "Please enter a password.");
        }

        // Display errors or submit the form
        if (errors.length > 0) {
            // Display errors
        } else {
            var data = {
                username: username,
                password: password
            };

            // Make the API call
            fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) { // Check if the response status is 200-299
                    return response.json();
                } else {
                    throw new Error('Login failed: ' + response.statusText);
                }
            })
            .then(data => {
                // Save the received data to localStorage
                localStorage.setItem('userData', JSON.stringify(data));
                
                alert('Login successful!');
                setTimeout(() => {
                    window.location.href = 'index.html';  // Redirect to the home page after 2 seconds
                }, 2000); // 2000 milliseconds = 2 seconds
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed: ' + error.message);
            });
        }
    });

    // Function to validate email
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Function to display error message
    function displayError(fieldId, errorMessage) {
        var field = $("#" + fieldId);
        var errorElement = $("<span class='error-message' style='color:red;'>" + errorMessage + "</span>");
        
        // Check if error message already exists
        if (field.next('.error-message').length === 0) {
            field.after(errorElement);
        }
    }

    // Function to remove error message
    function removeError(fieldId) {
        $("#" + fieldId).siblings(".error-message").remove();
    }
});
