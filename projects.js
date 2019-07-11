var project_quantity = -1;
// Load projects from DB to html
firebase.database().ref('projects').orderByChild('date').on('value',function(snapshot){
	var projects = snapshot.val();
	project_quantity = Object.keys(projects).length;
	// console.log(projects);
	// console.log(typeof(projects));
	// console.log(Object.keys(projects).length);

	for (var i = 1; i <= project_quantity; i++) {
		// Create html
		var html = '<h2 id="project-title-' + String(i) + '"></h2>';
		html += '<p id="project-description-' + String(i) + '"></p>';
		
		// Apply html
		document.getElementById('projects-div').innerHTML += html;

		document.getElementById('project-title-' + String(i)).innerHTML = projects[i].title;
		document.getElementById('project-description-' + String(i)).innerHTML = projects[i].description;
	}
});

function upload_project(){
	firebase.database().ref('projects/' + String(project_quantity + 1)).set({
		date: 'deit',
		title: document.getElementById('project-title-input').value,
		description: document.getElementById('project-description-input').value
	});

}











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





