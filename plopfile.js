/* eslint-disable */
const locales = require('./locales.json');

module.exports = function(plop) {
	plop.setPartial('locales', JSON.stringify(locales));

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
}
