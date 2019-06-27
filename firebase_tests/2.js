// var bigOne = document.getElementById('bigOne');
// var dbRef = firebase.database().ref().child('text');


// const auth = firebase.auth();
// auth.signInWithEmailAndPassword('ruben.jimenezmejias@pato.com','pass');
// auth.createUserWithEmailAndPassword('ruben.jimenezmejias@pato.com','pass');



(function(){
	// Initialize Firebase
	var config = {
			apiKey: "AIzaSyDyhRgik6Me-rDfs4ITRt54Nfb8ps8m45A",
			authDomain: "politics-rubenayla.firebaseapp.com",
			databaseURL: "https://politics-rubenayla.firebaseio.com",
			projectId: "politics-rubenayla",
			storageBucket: "politics-rubenayla.appspot.com",
			messagingSenderId: "276802918108",
			appId: "1:276802918108:web:e6c4843379ee62e0"
		};
		firebase.initializeApp(config);

		// Get elements
		const txtEmail = document.getElementById('txtEmail');
		const txtPassword = document.getElementById('txtPassword');
		const btnLogin = document.getElementById('btnLogin');
		const btnSignUp = document.getElementById('btnSignUp');
		const btnLogout = document.getElementById('btnLogout');

		btnLogin.addEventListener('click', e => {
			// Get email and pass
			const email = txtEmail.value;
			const pass = txtPassword.value;
			const auth = firebase.auth();
			// Sign in
			const promise = auth.signInWithEmailAndPassword(email,pass);
			promise.catch(e => console.log(e.message));
		});

		// Add signup event
		btnSignUp.addEventListener('click', e => {
			// Get email and pass
			// TODO: CHECK 4 REAL EMAIL
			const email = txtEmail.value;
			const pass = txtPassword.value;
			const auth = firebase.auth();
			// Sign in
			const promise = auth.createUserWithEmailAndPassword(email,pass);
			promise.catch(e => console.log(e.message));
		})

		// Add a realtime listener
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser){
				console.log(firebaseUser);
			} else {
				console.log('Not logged in');
			}
		})
}());