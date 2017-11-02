function loginUser(form) {

	var username = document.getElementById('usernameLogin').value;
	var password = document.getElementById('passwordLogin').value;

	var host = isProduction ? productionHost : devHost;
	var endpoint = `${host}/login`;
	var method = 'POST';
	var body = JSON.stringify({
		username: username,
		password: password
	});

	var request = new Request(endpoint, {
		method: method,
		credentials: 'cors',
		mode: 'CORS',
		redirect: 'follow',
		headers: new Headers({
			'Access-Control-Allow-Origin': endpoint,
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Expose-Headers': 'Authorization',
			'Access-Control-Allow-Headers': 'Authorization'
		}),
		body: body
	});

	fetch(request).then(function (response) {
		if (!response.ok) {
			document.getElementById('loginError').style.display = 'block';
			throw Error(response.statusText);
		} else {
			var cookieName = 'token';
			var cookieValue = response.headers.get('authorization');
			var cookieExpDays = 10;
			setCookie(cookieName, cookieValue, cookieExpDays);
			var seconds = 3;
			document.getElementById('loginSuccess').style.display = 'block';
			document.getElementById('loginSuccess').innerText = `Success! Redirecting to index in ${seconds}`;
			document.getElementById('loginButton').style.display = 'none';
			document.getElementById('logoutButton').style.display = 'block';
			setInterval(function () {
				if (seconds === 0) {
					window.location = '/';
				}
				seconds -= 1;
				document.getElementById('loginSuccess').innerText = `Success! Redirecting to index in ${seconds}`;
			}, 1000);

		}

	}).catch(function (error) {
		console.error(error);
	});
}

function signupUser() {

	var username = document.getElementById('usernameSignup').value;
	var password = document.getElementById('passwordSignup').value;

	var host = isProduction ? productionHost : devHost;
	var endpoint = `${host}/user/signup`;
	var method = 'POST';
	var body = JSON.stringify({
		username: username,
		password: password
	});

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			document.getElementById('signupSuccess').style.display = 'block';
		}
		if (httpRequest.status > 304) {
			document.getElementById('signupError').style.display = 'block';
		}
	};

	httpRequest.open(method, endpoint, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	httpRequest.send(body);
}

function isAuthorized() {
	// Get token cookie
	var cookie = getCookie('token');
	// "cookie" is not equal to false
	return cookie !== false;
}

function logoutUser() {
	deleteCookie('token');
	deleteCookie('username');
}