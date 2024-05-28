$(document).ready(function() {
    var form = $("#registrationForm");
    var submitButton = $("#submitButton");

    form.on("submit", function(event) {
        event.preventDefault(); 

        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        // var role = $("#role").val();

        var errors = [];

        // Clear previous error messages
        $(".error-message").remove();

        // Validate username
        if (username.length < 5) { // Changed this to 5 characters as per your error message
            errors.push("Username must be at least 5 characters long.");
            displayError("username", "Username must be at least 5 characters long.");
        }

        // Validate email
        if (!validateEmail(email)) {
            errors.push("Please enter a valid email address.");
            displayError("email", "Please enter a valid email address.");
        }

        // Validate password
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long."); // Updated the error message to be consistent
            displayError("password", "Password must be at least 8 characters long.");
        }

        // Validate confirm password
        if (password !== confirm_password) {
            errors.push("Passwords do not match.");
            displayError("confirm_password", "Passwords do not match.");
        }

        // Display errors or submit the form
        if (errors.length > 0) {
            // Do not submit the form if there are validation errors
        } else {
            // Prepare the data to be sent
            var data = {
                username: username,
                email: email,
                password: password
            };

            // Make the API call
            fetch('http://localhost:5000/api/auth/register', {
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
                    throw new Error('Registration failed: ' + response.statusText);
                }
            })
            .then(data => {
                
                setTimeout(() => {
                    alert('Registration successful!');
                   
                }, 4000); 
                window.location.href = 'signin.html';  // Redirect to the login page
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed: ' + error.message);
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
