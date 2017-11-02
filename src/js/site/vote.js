function makeVote(event, ele, how) {
	// Stop link from navigating
	event.preventDefault();

	var elementHref = ele.href;
	var postId = getItemIdFromQueryString('id', elementHref);
	var username = getCookie('username');
	var token = getCookie('token');

	upvoteHttp(postId, username, token);
}

function upvoteHttp(postId, username, token) {
	var host = isProduction ? productionHost : devHost;
	var endpoint = `${host}/api/post/vote`;
	var method = 'POST';
	var body = JSON.stringify({
		post_id: postId,
		username: username,
		mode: 'up'
	});

	var request = new Request(endpoint, {
		method: method,
		headers: new Headers({
			'Access-Control-Allow-Origin': endpoint,
			'Authorization': token,
			'Content-Type': 'application/json'
		}),
		body: body
	});

	fetch(request).then(function (response) {
		if (!response.ok) {
			alert('Something went wrong');
			throw Error(response.statusText);
		} else {
			console.log(response);
		}
	});
}


