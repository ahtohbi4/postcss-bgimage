postcss-bgimage
==============

[PostCSS](https://github.com/postcss/postcss) plug-in which removes 'background-image' properties with 'url()' values
or leaves only its. It allows to separate your layouts CSS from the images CSS to boost speed showing of page.

Installation
-----------------

```bash
npm install postcss-bgimage --save-dev
```

Usage
-----------------

#### [Grunt PostCSS](https://github.com/nDmitry/grunt-postcss)

```javascript
var postcss = require('postcss');
var bgImage = require('postcss-bgimage');

var processors = [
    bgImage({
        mode: 'cutter'
    });
];

postcss()
    .use(bgImage({
        mode: 'cutter'
    }))
    .process(src)
    .css;
```

#### [Gulp PostCSS](https://github.com/w0rm/gulp-postcss)

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var concat = require('concat');
var bgImage = require('postcss-bgimage');

gulp.task('compile', function() {
    gulp.src('css/**.css')
        .pipe(concat('top.css'))
        .pipe(postcss([
            bgImage({
                mode: 'cutter'
            })
        ]))
        .pipe(gulp.dest('compiled/css/'));

    gulp.src('css/**.css')
        .pipe(concat('bottom.css'))
        .pipe(postcss([
            bgImage({
                mode: 'cutterInvertor'
            })
        ]))
        .pipe(gulp.dest('compiled/css/'));
});
```

Result
-----------------

**input**

style.css:
```css
body {
    background-image: url(/path/to/img.png);
    font-family: Arial;
    padding: 20px 10px;
}
```

**output**

style.top.css:
```css
body {
    font-family: Arial;
    padding: 20px 10px;
}
```
style.bottom.css:
```css
body {
    background-image: url(/path/to/img.png);
}
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>postcss-bgimage test</title>
    <link rel="stylesheet" href="/compiled/css/style.top.css">
</head>
<body>
    <h1>postcss-bgimage test</h1>
    <p>Page content</p>
    <link rel="stylesheet" href="/compiled/css/style.bottom.css">
</body>
</html>
```

#### Ignore rules

To ignore some CSS rule use `/* bgImage: ignore */`. For example:

**input**

style.css:
```css
.some-rule {
    position: relative;
    background-image: url(/path/to/img1.png);
    font-family: Arial;
    padding: 20px 10px;
}
.ignore-rule {
    display: inline-block;
    /* bgImage: ignore */
    background: url(/path/to/img2.png);
}
```

**output**

style.top.css:
```css
.some-rule {
    position: relative;
    font-family: Arial;
    padding: 20px 10px;
}
.ignore-rule {
    display: inline-block;
    background: url(/path/to/img2.png);
}
```
style.bottom.css:
```css
.some-rule {
    background-image: url(/path/to/img1.png);
}
```

Options
--------------------

### Mode

One of two values:
 * `cutter`
 * `cutterInvertor`
