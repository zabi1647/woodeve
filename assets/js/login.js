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
            errors.push("Please enter username.");
            displayError("username", "Please enter username.");
        }

        

        // Validate password
        if (password.length < 1) {
            errors.push("Please enter password");
            displayError("password", "Please enter password");
        }


        // Display errors or submit the form
        if (errors.length > 0) {
            // alert(errors.join("\n"));
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
                    // return response.json();
                } else {
                    throw new Error('Login failed: ' + response.statusText);
                }
            })
            .then(data => {
                
                setTimeout(() => {
                    alert('Login  successful!');
                   
                }, 4000); 
                window.location.href = 'index.html';  // Redirect to the login page
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login  failed: ' + error.message);
            }); // Unbind the event and submit the form if no errors
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
