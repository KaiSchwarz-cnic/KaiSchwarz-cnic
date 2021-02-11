const { src, dest, series } = require("gulp");
const xo = require("gulp-xo");
const stylelint = require("gulp-stylelint");
const htmlhint = require("gulp-htmlhint");
const prettier = require("gulp-prettier");

function css() {
  return src("assets/css/styles.css").pipe(
    stylelint({
      failAfterError: true,
      reportOutputDir: "reports/lint",
      reporters: [{ formatter: "verbose", console: true }],
      debug: true,
    })
  );
}

function html() {
  return src(["index.html"])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failAfterError());
}

function eslintXO() {
  return src(["assets/main.js", "gulpfile.js"])
    .pipe(
      xo({
        globals: ["jQuery", "$", "document", "window"],
      })
    )
    .pipe(xo.format())
    .pipe(xo.failAfterError());
}

function prettierCheck() {
  return src([
    "assets/main.js",
    "assets/css/styles.css",
    ".prettierrc.js",
    "gulpfile.js",
    "index.html",
  ]).pipe(prettier.check());
}

exports.prettier = function () {
  return src([
    "assets/main.js",
    "assets/css/styles.css",
    ".prettierrc.js",
    "gulpfile.js",
    "index.html",
  ])
    .pipe(prettier())
    .pipe(dest((file) => file.base));
};

exports.validate = series(eslintXO, prettierCheck, css, html);
