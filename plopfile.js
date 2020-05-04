/* eslint-env node */
const locales = require('require-dir')('./lang');

module.exports = function(plop) {
	plop.setPartial('locales', JSON.stringify(locales, null, 4));

	plop.setGenerator('localize', {
		description: 'localize behavior',
		prompts: [],
		actions: [{
			type: 'add',
			path: './localize-behavior.js',
			templateFile: './plop/localize-behavior.hbs',
			force: true
		}]
	});
};
