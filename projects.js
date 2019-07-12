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


function show_add_projects(){
	if(document.getElementById('add-projects-div').style.display == 'none'){
		document.getElementById('add-projects-div').style.display = 'flex';
	} else {
		document.getElementById('add-projects-div').style.display = 'none';
	}
}



