function loadAllComments() {
	var endpoint = 'http://localhost:8080/api/post/allComments';
	var method = 'get';
	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			var allComments = JSON.parse(httpRequest.responseText);
			generateCommentsTable(allComments);
		}
	};

	httpRequest.open(method, endpoint, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send();
}

function generateCommentsTable(data) {
	for (var i = 0; i < data.length; i++) {

		// Variables for current data object
		var current = data[i];
		var href = current['post_url'];
		var postTitle = current['PostTitle'];
		var postText = current['PostText'];
		var id = current.id;
		var userName = current.userName;

		// Table body
		var tBody = document.getElementById('allCommentsBody');

		// classes tr
		var trTopClass = 'table__row--top';
		var trBotClass = 'table__row--bot';

		// Classes td top
		var tdTopUpvoteClass = 'td__top__upvote';
		var tdTopInfoClass = 'td__top__info';

		// Classes td bottom
		var tdBotEmptyClass = 'td__bottom__empty';
		var tdBotCommentClass = 'td__bottom__class';

		// Top section of the table - info and links
		var trTop = document.createElement('tr');
		trTop.classList.add(trTopClass);

		var tdTopUpvote = document.createElement('td');
		var tdTopUpvoteLink = document.createElement('a');
		tdTopUpvoteLink.href = `/vote?id=${id}`;
		tdTopUpvoteLink.setAttribute('onclick', 'return makeVote(event, this, "up")');
		tdTopUpvoteLink.innerText = '▲';
		tdTopUpvote.appendChild(tdTopUpvoteLink);
		tdTopUpvote.classList.add(tdTopUpvoteClass);

		var tdTopInfo = document.createElement('td');
		tdTopInfo.classList.add(tdTopInfoClass);
		tdTopInfo.setAttribute('colspan', '2');
		var infoString = `<a href="/user?username=${userName}">${userName}</a> | on: <a href="/item?id=${id}">${postTitle}</a>`;
		tdTopInfo.innerHTML = infoString;

		// Bottom section of the table - hidden and comment
		var trBottom = document.createElement('tr');
		trBottom.classList.add(trBotClass);

		var tdBotEmpty = document.createElement('td');
		tdBotEmpty.classList.add(tdBotEmptyClass);

		var tdBotComment = document.createElement('td');
		tdBotComment.classList.add(tdBotCommentClass);
		tdBotComment.innerText = postText;

		trTop.appendChild(tdTopUpvote);
		trTop.appendChild(tdTopInfo);

		trBottom.appendChild(tdBotEmpty);
		trBottom.appendChild(tdBotComment);

		tBody.appendChild(trTop);
		tBody.appendChild(trBottom);

		// Don't add spacer element after last element
		if (!(current === data[data.length -1])) {
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