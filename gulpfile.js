const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("build", () =>
  gulp
    .src("js/bot.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("watch", () => {
  gulp.watch("js/bot.js", gulp.series("build"));
});

gulp.task("start", gulp.series("build", "watch"));

// gulp.task("connect", function () {
//   connect.server({
//     root: ".",
//     livereload: true,
//   });
// });

// gulp.task("start", gulp.series("build", "watch", "connect"));
