var gulp      	    = require('gulp'), // Подключаем Gulp
    sass            = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync     = require('browser-sync'); // Подключаем Browser Sync
    autoprefixer    = require('gulp-autoprefixer'); // Подключаем автопрефиксер

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('dev/scss/**/*.scss') // Берем источник
        .pipe(sass()); // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }));
        .pipe(gulp.dest('distrib/css')); // Выгружаем результата в папку distrib/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'distrib' // Директория для сервера - distrib
        },
        notify: true // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('dev/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами
    gulp.watch('distrib/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('distrib/js/*.js', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    // Наблюдение за другими типами файлов
});



gulp.task('default', () =>
gulp.src('src/app.css')
.pipe(autoprefixer({
browsers: ['last 2 versions'],
cascade: false
}))
.pipe(gulp.dest('dist'))
);
