var gutil = require('gulp-util');
var through = require('through2');
var dot = require('dot');

module.exports = render;

function render (data, options) {
	options = options || {
		evaluate: /\{\{([\s\S]+?)\}\}/g,
		interpolate: /\{\{=([\s\S]+?)\}\}/g,
		encode: /\{\{!([\s\S]+?)\}\}/g,
		use: /\{\{#([\s\S]+?)\}\}/g,
		define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
		conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
		iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
		varname: 'it',
		strip: false,
		append: true,
		selfcontained: false
	};
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-dot-template', 'Streaming not supported!'));
			return;
		}

		try {
			var renderer = dot.template(file.contents.toString(), options);
			var rendered = renderer(data);
			file.contents = new Buffer(rendered);
			this.push(file);
		} catch (error) {
			this.emit('error', new gutil.PluginError('gulp-dot-template', error, { file: file.path }));
		}

		cb();
	});
}
