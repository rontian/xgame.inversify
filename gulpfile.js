'use strict';
const gulp = require("gulp");
const minify = require('gulp-minify');
const inject = require("gulp-inject-string");
const ts = require('gulp-typescript');
const plus = require('typescript-plus');
const merge = require('merge2');
const tsProject = ts.createProject('tsconfig.json', { typescript: plus });

gulp.task('buildJs', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(inject.replace('var ioc;', ''))
        .pipe(inject.prepend('window.ioc = {};\n'))
        .pipe(inject.replace('var __extends =', 'window.__extends ='))
        .pipe(minify({ ext: { min: ".min.js" } }))
        .pipe(gulp.dest('./bin'));
});

gulp.task("buildDts", ["buildJs"], () => {
    return tsProject.src()
        .pipe(tsProject())
        .dts
        .pipe(gulp.dest('./bin'));
});

gulp.task("build", ["buildDts"], () => {
});
gulp.task('default', ['build'])