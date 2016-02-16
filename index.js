var gutil = require('gulp-util');
var through = require('through2');
var dot = require('dot');

module.exports = render;

function render (data) {
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
			var renderer = dot.template(file.contents.toString());
			var rendered = renderer(data);
			file.contents = new Buffer(rendered);
			this.push(file);
		} catch (error) {
			this.emit('error', new gutil.PluginError('gulp-dot-template', error, { file: file.path }));
		}

		cb();
	});
}
