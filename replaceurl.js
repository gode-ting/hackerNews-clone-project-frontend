let glob = require('glob');
let replace = require('replace');

let allFiles = glob.sync('./dist/**/**.html');

console.log('Fixing all urls!');

allFiles.forEach((file) => {
	let siteCssLinkRegex = /href="\/dist\/css\/site.css"/;
	replace({
		regex: siteCssLinkRegex,
		replacement: 'href="/css/site.min.css"',
		paths: [file]
	});
	var regexHrefs = new RegExp('href="\/', 'g');
	replace({
		regex: regexHrefs,
		replacement: 'href="/hackerNews-clone-project-frontend/',
		paths: [file]
	});

	var regexSrcs = new RegExp('src="\/dist\/', 'g');
	replace({
		regex: regexSrcs,
		replacement: 'src="/hackerNews-clone-project-frontend/',
		paths: [file]
	});
});

console.log('Made all internal href\'s ready for production!');