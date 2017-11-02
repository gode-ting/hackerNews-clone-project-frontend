/* globals loadAllPosts */
var publicPage;
var isProduction = false;
var productionHost = 'http://46.101.190.192:8080';
var devHost = 'http://localhost:8080';
(function () {

	window.onload = function () {
		console.log('Window ready - main .js');
		var currentPath = window.location.pathname;
		var productionUrl = 'hackerNews-clone-project-frontend';
		var productionRegex = new RegExp(productionUrl, '');
		var isProduction = productionRegex.test(currentPath);

		tokenAndUsernameSet();

		var publicPages = [
			'/login/',
			'/comments/',
			'/'
		];

		if (isProduction) {
			isProduction = true;
			for (var i = 0; i < publicPages.length; i++) {
				publicPages[i] = '/' + productionUrl + publicPages[i];
			}
		}

		publicPage = publicPages.indexOf(currentPath) !== -1;

		if (!isAuthorized() && !publicPage) {
			var divUnauthorized = document.getElementById('divUnauthorized');
			divUnauthorized.style.display = 'block';
			return;
		}
		var divAuthorized = document.getElementById('divAuthorized');
		divAuthorized.style.display = 'block';

		var indexRegex = isProduction ? new RegExp(`/${productionUrl}`, '') : /^\/$/;
		if (indexRegex.test(currentPath)) {
			// index.js function
			console.log('Index');
			loadAllPosts();
		}

		var commentsRegex = /^\/comments\/$/;
		if (commentsRegex.test(currentPath)) {
			loadAllComments();
		}

		var userPageRegex = /^\/user\/$/;
		if (userPageRegex.test(currentPath)) {
			loadUserProfile();
		}

		var itemPageRegex = /^\/item\/$/;
		if (itemPageRegex.test(currentPath)) {
			loadItemData();
		}

		// router
		var Router = {
			routes: {
				'/': function () {
					Router.makeCurrent('index');
				},
				'/new': function () {
					Router.makeCurrent('new');
				},
				'/comments': function () {
					Router.makeCurrent('comments');
				},
				'/show': function () {
					Router.makeCurrent('show');
				},
				'/ask': function () {
					Router.makeCurrent('ask');
				},
				'/jobs': function () {
					Router.makeCurrent('jobs');
				},
				'/submit': function () {
					Router.makeCurrent('submit');
				}
			},
			nav: function () {
				var route = window.location.pathname;
				if (route !== '/') {
					route = route.replace(/\/$/, '');
				}
				// Do not do it on login page
				if (!/login/.test(route) && !/item/.test(route) && !/user/.test(route) && !indexRegex.test(route)) {
					this.routes[route].apply();
				}
			},
			makeCurrent: function (item) {
				document.getElementById(`top-nav__link-${item}`).classList.add('active');

			}
		};

		Router.nav();
		document.getElementsByClassName('top-nav__link').onclick = Router.nav();
	};
})();

function tokenAndUsernameSet() {
	var tokenCookie = getCookie('token');
	var usernameCookie = getCookie('username');

	if (tokenCookie && usernameCookie) {
		document.getElementById('loginButton').style.display = 'none';
		document.getElementById('logoutButton').style.display = 'block';
	}
	// If logged in but username cookie not set
	if (tokenCookie && !usernameCookie) {
		document.getElementById('loginButton').style.display = 'none';
		document.getElementById('logoutButton').style.display = 'block';
		var token = getCookie('token');
		var tokenFilteredBearer = token.split(' ').pop();
		var encodedUsername = tokenFilteredBearer.split('.')[1];
		var decodedUsername = atob(encodedUsername);
		var cookieValue = JSON.parse(decodedUsername).username;
		var cookieName = 'username';
		var cookieExpDays = 10;
		setCookie(cookieName, cookieValue, cookieExpDays);
	} else if (!tokenCookie && usernameCookie) {
		deleteCookie('username');
	}
	return;
}