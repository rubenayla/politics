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
	// Dates
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var date_time = date+' '+time;
	// Project info
	var title = document.getElementById('project-description-input').value;
	var description = document.getElementById('project-description-input').value;

	// Add project with unique key related to the current timestamp
	var project_ref = firebase.database().ref('projects').push();
	console.log(project_ref);
	console.log(project_ref.key);
	project_ref.set({
		timestamp: Date.now(),
		dateTime: date_time,
		title: title,
		description: description,
		uid: firebase.auth().currentUser.uid
	}).catch(function(error){
		alert('Error: ' + error.message);
		console.log(error);
	});
	document.getElementById('project-title-input').value = null;
	document.getElementById('project-description-input').value = null;
};