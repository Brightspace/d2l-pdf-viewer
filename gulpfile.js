/* eslint-disable */
const { src, dest } = require('gulp');
const merge = require('gulp-merge-json');
const { basename } = require('path');

function defaultTask() {
	return src('lang/*.json')
		.pipe(merge({
			fileName: 'locales.json',
			edit: (parsedJson, file) => {
				const lang = basename(file.path, '.json');
				return {
					[lang]: parsedJson
				};
			}
		}))
		.pipe(dest('.'));
}

exports.default = defaultTask;
