const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('symbols:dev'),
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev', 'copyManifest:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task(
	'docs',
	gulp.series(
		'clean:docs',
		gulp.parallel('symbols:docs', 'html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs', 'copyManifest:docs'),
		gulp.parallel('server:docs')
	)
);
