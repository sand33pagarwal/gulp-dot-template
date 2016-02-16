# gulp-dot-template

Render [doT templates](http://olado.github.io/doT/index.html)

## Installation

```
npm i gulp-dot-template --save
```

## Usage

### `src/template.dot`

```
Hello, {{=it.name}}!
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var template = require('gulp-dot-template');

gulp.task('default', function () {
	return gulp.src('src/template.dot')
		.pipe(template({ name: 'Bob' }))
		.pipe(gulp.dest('dist'));
});
```

## License

MIT
