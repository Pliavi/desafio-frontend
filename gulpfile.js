var gulp = require("gulp");
var pug = require("gulp-pug");
var styl = require("gulp-stylus");
var pump = require("pump");

gulp.task("pug", cb => {
  pump([gulp.src("src/index.pug"), pug(), gulp.dest("dest")], cb);
});

gulp.task("styl", cb => {
  pump([gulp.src("src/css/index.styl"), styl(), gulp.dest("dest/css")], cb);
});

gulp.task("copy", cb => {
  pump(
    [
      gulp.src(["src/js/**/*"]),
      gulp.dest("dest/js"),
      gulp.src(["src/img/**/*"]),
      gulp.dest("dest/img")
    ],
    cb
  );
});

gulp.task("watch", function() {
  gulp.watch(["src/img/**/*", "src/js/**/*"], gulp.series("copy"));
  gulp.watch("src/*.pug", gulp.series("pug"));
  gulp.watch("src/css/*.styl", gulp.series("styl"));
});

gulp.task("default", gulp.parallel("pug", "styl", "copy", "watch"));
