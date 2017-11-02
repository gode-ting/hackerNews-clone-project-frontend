function submitPost() {
	// post_parent always set to -1 as there can't be any comment to a new post
	var postParent = "";
	// Same as above
	var postType = 'story';
	var title = document.getElementById('titleSubmit').value;
	var url = document.getElementById('urlSubmit').value;
	console.log(url)
	var text = document.getElementById('textSubmit').value;
	var token = getCookie('token');
	var username = getCookie('username');

	if (!title) {
		document.getElementById('submitError').style.display = 'block';
		return;
	}

	if (title && url && text) {
		document.getElementById('submitError').style.display = 'block';
		return;
	}

	var endpoint = 'http://localhost:8080/api/post';
	var method = 'post';
	var body = JSON.stringify({
		post_title: title,
		post_text: text,
		post_url: url,
		post_type: postType,
		post_parent: postParent,
		username: username
	});

	var request = new Request(endpoint, {
		method: method,
		body: body,
		mode: 'CORS',
		headers: new Headers({
			'Authorization': token,
			'Content-Type': 'application/json'
		})
	});

	fetch(request).then(function (response) {
		if (!response.ok) {
			console.log(response)
			document.getElementById('submitError').innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">×</span>Something went wrong... Please try again';
			document.getElementById('submitError').style.display = 'block';
			throw Error(response.statusText);
		}
		window.location = '/';
	});
}