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
        if (username.length < 5) {
            errors.push("Username must be at least 5 characters long.");
            displayError("username", "Username must be at least 5 characters long.");
        }

        // Validate email
        if (!validateEmail(email)) {
            errors.push("Please enter a valid email address.");
            displayError("email", "Please enter a valid email address.");
        }

        // Validate password
        if (password.length !== 8) {
            errors.push("Password must be exactly 8 characters long.");
            displayError("password", "Password must be exactly 8 characters long.");
        }

        // Validate confirm password
        if (password !== confirm_password) {
            errors.push("Passwords do not match.");
            displayError("confirm_password", "Passwords do not match.");
        }

        // Display errors or submit the form
        if (errors.length > 0) {
            // alert(errors.join("\n"));
        } else {
            form.off('submit').submit(); // Unbind the event and submit the form if no errors
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
