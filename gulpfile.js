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
        .pipe(inject.replace('var inversify;', ''))
        .pipe(inject.prepend('window.inversify = {};\n'))
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
    return merge([
        gulp.src('bin/**/*')
            .pipe(gulp.dest('../client/libs/xgame.inversify/')),
        gulp.src('bin/*.ts')
            .pipe(gulp.dest('../xgame.core/libs')),
        gulp.src('bin/*.ts')
            .pipe(gulp.dest('../xgame.egret/libs'))
    ]);
});
gulp.task('default', ['build'])