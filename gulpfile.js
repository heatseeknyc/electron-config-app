//const spawn = require('child_process').spawn;
const spawn = require('cross-spawn');
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-css');
const path = require('path');
// 1. Copy the index.html as is
gulp.task('html', () => {  
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app/'));
});
// 2. Compile CSS file and move them to the app folder
gulp.task('css', function() { // 2.
    return gulp.src('src/contents/style/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/contents/style/'));
});

// 3. Compile JS files and move them to the app folder
gulp.task('js', () => { // 3.
    return gulp.src(['src/**/**/*.js'])
         .pipe(babel())
         .pipe(gulp.dest('app/'));
});
// 4. Start the electron process.

const cmd   = (name) => path.join(__dirname + `/node_modules/.bin/${name}`);
//const cmd = (name) => name;
const args  = (more) => Array.isArray(more) ? ['.'].concat(more) : ['.'];
const exit  = () => process.exit();

gulp.task('start', gulp.series('html', 'css', 'js', () => { // 4.
    spawn(cmd('electron'), args(), { stdio: 'inherit' }).on('close', exit);
    return Promise.resolve();
}));