module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,json}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};