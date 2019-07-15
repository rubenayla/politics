var project_quantity = -1;
// Load projects from DB to html
firebase.database().ref('projects').orderByChild('date').on('value',function(snapshot){
	var projects = snapshot.val();
	project_quantity = Object.keys(projects).length;
	// console.log(projects);
	// console.log(typeof(projects));
	// console.log(Object.keys(projects).length);
	document.getElementById('projects').innerHTML = "";
	for (var i = 1; i <= project_quantity; i++) {
		// Create html
		var html = '<h2 id="project-title-' + String(i) + '"></h2>';
		html += '<p id="project-description-' + String(i) + '"></p>';
		
		// Apply html
		document.getElementById('projects').innerHTML += html;

		document.getElementById('project-title-' + String(i)).innerHTML = projects[i].title;
		document.getElementById('project-description-' + String(i)).innerHTML = projects[i].description;
	}
});

