














function register(){

	var email = document.getElementById("email-input-login").value;
	var pwd = document.getElementById("pwd-input-login").value;

	firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert("Error: " + errorMessage);
	});
}