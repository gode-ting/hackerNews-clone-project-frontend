let glob = require('glob');
let replace = require('replace');

let allFiles = glob.sync('./dist/**/*@(.html|.js)');

console.log('All files: ', allFiles);

console.log('Fixing all urls!');

allFiles.forEach((file) => {
	let siteCssLinkRegex = /href="\/dist\/css\/site.css"/;
	replace({
		regex: siteCssLinkRegex,
		replacement: 'href="/css/site.min.css"',
		paths: [file]
	});
	// var regexHrefs = new RegExp('href="\/', 'g');
	// replace({
	// 	regex: regexHrefs,
	// 	replacement: 'href="/hackerNews-clone-project-frontend/',
	// 	paths: [file]
	// });

	let regexSrcs = new RegExp('src="/dist\/', 'g');
	replace({
		regex: regexSrcs,
		replacement: 'src="/',
		paths: [file]
	});

	// replace dev urls with prod
	let prodBackendUrl = 'http://46.101.190.192:8080';

	let devUrlRegex = new RegExp('http:\/\/localhost:8080', 'g');
	replace({
		regex: devUrlRegex,
		replacement: prodBackendUrl,
		paths: [file]
	});
});

console.log('Made all internal href\'s ready for production!');