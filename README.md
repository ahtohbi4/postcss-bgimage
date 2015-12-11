# postcss-bgimage

[PostCSS](https://github.com/postcss/postcss) plug-in which removes 'background-image' properties with 'url()' values
or leaves only its. It allows to separate your layouts CSS from the images CSS to boost speed showing of page.

##Installation

```bash
npm install postcss-bgimage --save-dev
```

##Usage
**PostCss**

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

**Gulp**

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

##Result

input:
```css
/* css/style.css */
body {
    background-image: url(/img/picture.css);
    font-family: Arial;
    padding: 20px 10px;
}
```

output:
```css
/* compiled/css/top.css */
body {
    font-family: Arial;
    padding: 20px 10px;
}

/* compiled/css/bottom.css */
body {
    background-image: url(/img/picture.css);
}
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>postcss-bgimage test</title>
    <link rel="stylesheet" href="/compiled/css/top.css">
</head>
<body>
    <h1>postcss-bgimage test</h1>
    <p>Page content</p>
    <link rel="stylesheet" href="/compiled/css/bottom.css">
</body>
</html>
```
