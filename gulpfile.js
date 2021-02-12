const { src, dest, series } = require("gulp");
const xo = require("gulp-xo");
const stylelint = require("gulp-stylelint");
const htmlhint = require("gulp-htmlhint");
const jsonlint = require("gulp-jsonlint");
const prettier = require("gulp-prettier");

function cssLint() {
  return src("assets/css/styles.css").pipe(
    stylelint({
      failAfterError: true,
      reportOutputDir: "reports/lint",
      reporters: [{ formatter: "verbose", console: true }],
      debug: true,
    })
  );
}

function htmlLint() {
  return src(["index.html"])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failAfterError());
}

function jsonLint() {
  return src(["package.json", ".stylelintrc.json", ".xo-config.json"])
    .pipe(jsonlint())
    .pipe(jsonlint.failOnError());
}

function jsLint() {
  return src(["assets/main.js", "gulpfile.js", ".prettierrc.js"])
    .pipe(
      xo({
        globals: ["$", "window"],
      })
    )
    .pipe(xo.format())
    .pipe(xo.failAfterError());
}

exports.prettier = function () {
  return src([
    "assets/main.js",
    "assets/css/styles.css",
    ".prettierrc.js",
    "gulpfile.js",
    ".stylelintrc.json",
    ".xo-config.json",
    "package.json",
    "index.html",
  ])
    .pipe(prettier())
    .pipe(dest((file) => file.base));
};

exports.validate = series(jsLint, jsonLint, cssLint, htmlLint);
