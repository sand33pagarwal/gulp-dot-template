var gutil = require('gulp-util');
var should = require('should');

var template = require('../');

it('should render dot templates', function (cb) {
	var stream = template({ foo: 'barbaz' });

	stream.on('data', function (data) {
		data.contents.toString().should.eql('barbaz bar');
	});

	stream.on('end', cb);

	stream.write(new gutil.File({
		contents: new Buffer('{{=it.foo}} bar')
	}));

	stream.end();
});
