// Read about cookies here: https://www.w3schools.com/js/js_cookies.asp

function setCookie(cookieName, cookieValue, cookieExpDays) {
	var date = new Date();
	date.setTime(date.getTime() + (cookieExpDays * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + date.toUTCString();
	document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

function getCookie(cookieName) {
	var name = cookieName + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return false;
}

function deleteCookie(cookiename) {
	document.cookie = cookiename + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// function checkCookie() {
// 	var username = getCookie('username');
// 	if (username !== '') {
// 		alert('Welcome back', username);
// 	} else {
// 		window.location.href('/login');
// 	}
// }