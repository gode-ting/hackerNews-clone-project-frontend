function loadItemData() {
	getItem();
}

function getItem() {
	let itemId = getItemIdFromQueryString('id');

	var endpoint = `http://localhost:8080/api/post/comments/${itemId}`;
	var method = 'GET';
	var httpRequest = new XMLHttpRequest();
	console.log('Item id: ', itemId);

	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			// var allPosts = JSON.parse(httpRequest.responseText);
			console.log(httpRequest);
		}
	};

	httpRequest.open(method, endpoint, true);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send();
}

function addComment() {
	console.log('Add comment to item!');

	var itemComment = document.getElementById('itemComment').value;
	if (itemComment) {
		console.log('Item comment: ', itemComment);
	}
}

function generateCommentTable(data) {

}

comments = [
	{
		comment: 'comment one', comments: [
			{
				comment: 'comment two in comment two', comments: [
					{}
				]
			}
		]
	},
	{
		comment: 'comment two', comments: [
			{
				comment: 'comment two in comment two', comments: [
					{}
				]
			}
		]
	},
	{
		comment: 'comment three', comments: [
			{
				comment: 'comment three in comment three', comments: [
					{}
				]
			}
		]
	}
];