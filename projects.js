// Who we are, to newcomers
firebase.auth().onAuthStateChanged(function(user){
	if(user == null){
		document.getElementById('who-are-we').style.display = 'flex';
	} else{
		document.getElementById('who-are-we').style.display = 'none';
	}
});

var project_quantity = -1;
// Load projects from DB to html
firebase.database().ref('projects').on('value',function(snapshot){
	// console.log(snapshot.val());
	var keys = Object.keys(snapshot.val());
	var projects = [];

	for (var i = 0; i < keys.length; i++) {
		firebase.database().ref('projects/' + keys[i]).on('value',function(snapshot){
			projects.push(snapshot.val());

		});
	}
	console.log(projects);
	document.getElementById('projects').innerHTML = "";
	for (var i = 0; i < projects.length; i++) {
		// Create html
		var html = '<div class="project">';
		html += '<h2 id="project-title-' + projects[i].timestamp + '"></h2>';
		html += '<p id="project-description-' + projects[i].timestamp + '"></p>';
		html += '</div>';
		// Apply html
		document.getElementById('projects').innerHTML += html;

		document.getElementById('project-title-' + projects[i].timestamp).innerHTML = projects[i].title;
		document.getElementById('project-description-' + projects[i].timestamp).innerHTML = projects[i].description;

	}
});