function loadUserProfile() {
	getUserProfile();
}

function getUserProfile() {
	var username = getItemIdFromQueryString('username');

	var endpoint = `http://localhost:8080/user?username=${username}`;
	var method = 'GET';
	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			var userProfile = JSON.parse(httpRequest.responseText);
			var created = userProfile.createdAt;
			var karma = userProfile.karma;

			var usernameElement = document.getElementById('userProfile');
			var createdElement = document.getElementById('createdText');
			var karmaElement = document.getElementById('karmaText');

			usernameElement.innerText = username;
			createdElement.innerText = created;
			karmaElement.innerText = karma;
		}
	};

	httpRequest.open(method, endpoint, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send();
}