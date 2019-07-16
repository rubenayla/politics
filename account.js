// Load website user data
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is logged in, so show the account
		document.getElementById('log').style.display = 'none';
		document.getElementById('account').style.display = 'flex';

		var name = user.displayName;
		var email = user.email;
		var photoURL= user.photoURL;
		var emailVerified = user.emailVerified;
		var uid = user.uid;

		// Welcome message
		if (name != null) {
			document.getElementById('user-welcome').innerHTML = 'Bienvenido/a ' + name;
		} else {
			document.getElementById('user-welcome').innerHTML = 'Bienvenido/a ' + email;
		}
		
		// Show profile data (Auth)
		if (user.photoURL != null){
			document.getElementById('account-image').innerHTML = '<img src="' + user.photoURL + '">';
		} else {
			// In case there was an image before and the user has 
			// removed it. It must go away.
			document.getElementById('account-image').innerHTML = null;
		}
		document.getElementById('account-name-input').value = user.displayName;
		document.getElementById('account-email-data').innerHTML = user.email;
		document.getElementById('account-imagelink-input').value = user.photoURL;

		// Show DB data
		firebase.database().ref('users/' + user.uid).on('value',function(snapshot){
			// If the user exists at the DB... (snapshot.val())
			// (otherwise wait the register function to create it. It must be first
			// authenticated)
			user = firebase.auth().currentUser;
			if(snapshot.val() != null && user != null){
				if (snapshot.val().username != undefined){
					document.getElementById('account-username-input').value = snapshot.val().username;
				}

				if (snapshot.val().surname != undefined){
					document.getElementById('account-surname-input').value = snapshot.val().surname;
				}

				if (snapshot.val().bio != undefined){
					document.getElementById('account-bio-input').value = snapshot.val().bio;
				}

				if (snapshot.val().freetext != undefined){
					document.getElementById('account-freetext-input').value = snapshot.val().freetext;
				}
				
				if (user.emailVerified == true){
					document.getElementById('verify-email').style.display = 'none';
				} else {
					document.getElementById('verify-email').style.display = 'flex';
				}
				
				if (snapshot.val().birthdate != undefined){
					document.getElementById('account-birthday-input').value = snapshot.val().birthdate;
				}
				// TODO: MAKE THIS SHORT AND ELEGANT
			};
		});

	} else {
		// No user is logged in. (If recently logged out, and for redundancy)
		document.getElementById('log').style.display = 'flex';
		document.getElementById('account').style.display = 'none';
	}
});


function register(){

	var email = document.getElementById('email-input').value;
	var pwd = document.getElementById('pwd-input').value;

	firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
		alert('Error: ' + error.message);
		console.log(error);
	});
	// Just after registry, the onAuthStateChanged function will try to show data that 
	// still doesn't exist in the DB, and will show an error. Wait 100ms to have a 
	// registered user, and then update the data to the DB.
	setTimeout(update, 2000);
}
function login(){
	var email = document.getElementById('email-input').value;
	var pwd = document.getElementById('pwd-input').value;

	firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
		// Handle Errors here.
		alert('Error: ' + error.message);
	});

	// (Don't keep the input data in the html)
	email = null;
	pwd = null;
}
function logout(){
	firebase.auth().signOut();
}
function google_login(){
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The logged-in user info.
		var user = result.user;

	}).catch(function(error) {
		alert('Error: ' + error.message);
		console.log(error);
	});
}
// function twitter_login(){
// 	var provider = new firebase.auth.TwitterAuthProvider();

// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 		// This gives you a Google Access Token. You can use it to access the Google API.
// 		var token = result.credential.accessToken;
// 		// The logged-in user info.
// 		var user = result.user;
// 		// ...
// 	}).catch(function(error) {
// 		alert('Error: ' + error.message);
// 		console.log(error);
// 	});
// }
function passwordForgotten(){
	var email = document.getElementById('email-input').value;
	var auth = firebase.auth();

	auth.sendPasswordResetEmail(email).then(function() {
		alert('Email sent');
	}).catch(function(error) {
		alert('Error: ' + error.message);
		console.log(error);
	});
}
function resetPassword(){
	var auth = firebase.auth();
	var email = auth.currentUser.email;

	auth.sendPasswordResetEmail(email).then(function() {
		alert('Email sent');
	}).catch(function(error) {
		alert('Error: ' + error.message);
		console.log(error);
	});
}
function verifyEmail(){
	firebase.auth().currentUser.sendEmailVerification().then(function(){
		alert('Email enviado. Recarga la página ver los efectos');
	}).catch(function(error){
		alert('Error: ' + error.message);
		console.log(error);
	});
	
}

function deleteAccount() {
	var rlly = confirm('¿Estás seguro de que quieres borrar la cuenta?');
	if(rlly){
		var user = firebase.auth().currentUser;

		user.delete().then(function() {
			// User deleted.
		}).catch(function(error) {
			alert('Error: ' + error.message);
			console.log(error);
		});
	}
}


function update(){
	console.log('Updating data...');
	var user = firebase.auth().currentUser;
	
	// Update auth data (name and photoURL)
	if(user){
		user.updateProfile({
			displayName: document.getElementById('account-name-input').value,
			photoURL: document.getElementById('account-imagelink-input').value
		}).then(function() {
			// Update successful.
			// alert('Update successful');
		}).catch(function(error) {
			// An error happened.
			// alert(error);
		});

		// Profile data to DB
		firebase.database().ref('users/' + user.uid).set({
			email: user.email,
			username: document.getElementById('account-username-input').value,
			name: user.displayName,
			surname: document.getElementById('account-surname-input').value,
			photo_url: user.photoURL,
			emailVerified: user.emailVerified, // Not secure
			bio: document.getElementById('account-bio-input').value,
			freetext: document.getElementById('account-freetext-input').value,
			birthdate: document.getElementById('account-birthday-input').value
		});
	}
}