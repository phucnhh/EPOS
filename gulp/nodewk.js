var gulp = require('gulp');
var NwBuilder = require('node-webkit-builder');
module.exports = function(options) {
	gulp.task('nodewk', function(){
		var nw = new NwBuilder({
		    files: options.dist + '/**/**', // use the glob format,
		    version : "0.8.6",
		    platforms: ['linux64']
		});

		// Build returns a promise
		nw.build().then(function () {
		   console.log('build node-webkit done!');
		}).catch(function (error) {
		    console.error(error);
		});
	});

	gulp.task('nodewk-mini', ['build'], function () {
	    gulp.start('nodewk');
	});

	gulp.task('nodewk-full', ['build-full'], function () {
	    gulp.start('nodewk');
	});
};
