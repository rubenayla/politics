function login(){
 
 var email = document.getElementById('email').value;
 var pwd = document.getElementById('pwd').value;
 console.log(email,pwd);
 firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
 
}