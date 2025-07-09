/**
 * @file: public/app.js
 * @description: Frontend JavaScript for handling user interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // This code waits for the HTML document to be fully loaded before running.

  // A short-hand to the Firebase Authentication service
  const auth = firebase.auth();

  // Get our HTML elements from the page
  const signupForm = document.getElementById("signup-form");
  const errorMessage = document.getElementById("error-message");

  // Listen for the user to click the "Create Account" button (the 'submit' event)
  signupForm.addEventListener("submit", (e) => {
    // This prevents the browser from refreshing the page, which is the default form behavior.
    e.preventDefault();

    // Clear any previous error messages.
    errorMessage.textContent = "";

    // Get the email and password that the user typed into the form.
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Use the Firebase Authentication SDK to create a new user account in the cloud.
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // This part of the code runs if the sign-up is SUCCESSFUL.
        console.log("Successfully created user:", userCredential.user.uid);
        alert(
          "Account successfully created! Your organization profile has been created automatically."
        );
        // In a real app, we would redirect the user to their new dashboard here.
      })
      .catch((error) => {
        // This part of the code runs if Firebase returns an ERROR.
        console.error("Error signing up:", error);
        // Display the error message to the user on the page.
        errorMessage.textContent = error.message;
      });
  });
});