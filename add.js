function show_add_projects(){
	if(document.getElementById('add-projects-div').style.display == 'none'){
		document.getElementById('add-projects-div').style.display = 'flex';
	} else {
		document.getElementById('add-projects-div').style.display = 'none';
	}
}
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		if(user.emailVerified){
			document.getElementById('has-to-be-verified').style.display = 'none';
			document.getElementById('add-project').style.display = 'flex';
		}
	}
});

function add_project(){
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
