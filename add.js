function show_add_projects(){
	if(document.getElementById('add-projects').style.display == 'none'){
		document.getElementById('add-projects').style.display = 'flex';
	} else {
		document.getElementById('add-projects').style.display = 'none';
	}
}

// Verified and show add-project
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		if(user.emailVerified){
			document.getElementById('has-to-be-verified').style.display = 'none';
			document.getElementById('add-project').style.display = 'flex';
		}
	}
});

function add_project(){
	var project_quantity = Object.keys(projects).length;
	firebase.database().ref('projects/' + String(project_quantity + 1)).set({
		date: 'deit',
		title: document.getElementById('project-title-input').value,
		description: document.getElementById('project-description-input').value,
		uid: firebase.auth().currentUser.uid
	}).catch(function(error){
		alert('Error: ' + error.message);
		console.log(error);
	});

	document.getElementById('project-title-input').value = null;
	document.getElementById('project-description-input').value = null;
}
