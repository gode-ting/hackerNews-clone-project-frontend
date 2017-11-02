function loadAllPosts() {
	var endpoint = 'http://localhost:8080/api/post?page=1';
	var method = 'get';
	var httpRequest = new XMLHttpRequest();


	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			var allPosts = JSON.parse(httpRequest.responseText);
			generatePostsTable(allPosts);
		}
	};

	httpRequest.open(method, endpoint, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send();
}

function generatePostsTable(data) {
	for (var i = 0; i < data.length; i++) {

		// Variables for current data object
		var current = data[i];
		var href = current['post_url'];
		var postTitle = current['post_title'];
		var id = current.id;
		var userName = current.username;

		// Table body
		var tBody = document.getElementById('allPostsBody');

		// Classes tr
		var trTopClass = 'table__row--top';
		var trBotClass = 'table__row--bot';

		// Classes td top
		var tdTopNumberClass = 'td__top__number';
		var tdTopUpvoteClass = 'td__top__upvote';
		var tdTopTitleClass = 'td__top__title';

		// Classes td bottom
		var tdBotEmptyClass = 'td__bottom__empty';
		var tdBotInfoClass = 'td__bottom__info';

		// Top section of table
		var trTop = document.createElement('tr');
		trTop.classList.add(trTopClass);
		var tdNumber = document.createElement('td');
		tdNumber.classList.add(tdTopNumberClass);
		var number = document.createElement('span');
		number.classList.add(`${tdTopNumberClass}--span`);
		number.innerText = i + 1;
		tdNumber.appendChild(number);
		var tdUpvote = document.createElement('td');
		tdUpvote.classList.add(tdTopUpvoteClass);
		var upvoteLink = document.createElement('a');
		upvoteLink.innerText = '▲';
		upvoteLink.href = `/vote?id=${id}`;
		upvoteLink.setAttribute('onclick', 'return makeVote(event, this, "up")');
		upvoteLink.classList.add(`${tdTopUpvoteClass}--link`);
		upvoteLink.classList.add('upvoteLink');

		tdUpvote.appendChild(upvoteLink);
		var tdTitle = document.createElement('td');
		tdTitle.classList.add(tdTopTitleClass);
		var titleLink = document.createElement('a');
		if (href) {
			titleLink.innerText = `${postTitle} (${href})`;
			titleLink.href = href;
		} else {
			titleLink.innerText = `${postTitle}`;
			titleLink.href = `/item?id=${id}`;
		}
		titleLink.classList.add(`${tdTopTitleClass}--link`);
		tdTitle.appendChild(titleLink);

		trTop.appendChild(tdNumber);
		trTop.appendChild(tdUpvote);
		trTop.appendChild(tdTitle);

		// Bottom section of table
		var trBottom = document.createElement('tr');
		trBottom.classList.add(trBotClass);
		var tdEmpty = document.createElement('td');
		tdEmpty.classList.add(tdBotEmptyClass);
		var tdInfo = document.createElement('td');
		tdInfo.classList.add(tdBotInfoClass);
		tdInfo.setAttribute('colspan', '2');
		var infoString = `<span class='score'>50 points</span> by <a href="/user?username=${userName}">${userName}</a> | <a href=/item?id=${id}>number of comments</a>`;
		tdInfo.innerHTML = infoString;
		trBottom.appendChild(tdEmpty);
		trBottom.appendChild(tdInfo);

		tBody.appendChild(trTop);
		tBody.appendChild(trBottom);

		// Don't add spacer element after last element
		if (!(current === data[data.length - 1])) {
			// Spacing section (separate posts)
			var trSpacer = document.createElement('tr');
			trSpacer.classList.add('table__row--spacer');
			trSpacer.setAttribute('colspan', '3');
			var tdSpacer = document.createElement('td');
			tdSpacer.setAttribute('colspan', 3);
			trSpacer.appendChild(tdSpacer);
			tBody.appendChild(trSpacer);
		}

	}
}