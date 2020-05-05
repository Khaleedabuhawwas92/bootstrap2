var gulp = require("gulp");
pug = require("gulp-pug");
livereload = require("gulp-livereload");
sass = require("gulp-sass");
gs = require("glob-stream");
msg = require("gulp-msg");
autoprefixer = require("gulp-autoprefixer");

//Html
gulp.task("html", function () {
   var path = ["project/index.pug"];
   return gulp
      .src(path)
      .pipe(pug({ pretty: true }))
      .pipe(gulp.dest("dist"))
      .pipe(livereload());
});

//js
gulp.task("js", function () {
   return gulp
      .src("project/js/plugin.js")
      .pipe(gulp.dest("dist/js"))
      .pipe(livereload());
});

//css Task
gulp.task("css", function () {
   var path = ["project/css/main.scss", "project/css/scss/media.scss"];
   return gulp
      .src(path)
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(autoprefixer("last 2 versions"))
      .pipe(gulp.dest("dist/css"))
      .pipe(livereload());
});

//watch task
gulp.task("watch", function () {
   require("./server.js");
   livereload.listen();
   gulp.watch("project/**/*.pug", gulp.series("html"));
   gulp.watch("project/**/*.js", gulp.series("js"));
   gulp.watch("project/css/**/*.scss", gulp.series("css"));
});
