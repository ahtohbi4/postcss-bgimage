postcss-bgimage
==

[![npm version][version-img]][version] [![Dependency Status][dependency-img]][dependency] [![Travis Build Status][travis-img]][travis] [![Appveyor Build Status][appveyor-img]][appveyor] [![Codacy Badge][codacy-img]][codacy]

[dependency-img]: https://david-dm.org/ahtohbi4/postcss-bgimage.svg
[dependency]: https://david-dm.org/ahtohbi4/postcss-bgimage
[version-img]: https://badge.fury.io/js/postcss-bgimage.svg
[version]: https://badge.fury.io/js/postcss-bgimage
[travis-img]: https://travis-ci.org/ahtohbi4/postcss-bgimage.svg?branch=master
[travis]: https://travis-ci.org/ahtohbi4/postcss-bgimage
[appveyor-img]: https://ci.appveyor.com/api/projects/status/0xodj7np6jghyuik/branch/master?svg=true
[appveyor]: https://ci.appveyor.com/project/ahtohbi4/postcss-bgimage/branch/master
[codacy-img]: https://api.codacy.com/project/badge/grade/480c7aa1737046bfa6d475082847d513
[codacy]: https://www.codacy.com/app/alexandr-post/postcss-bgimage

> [PostCSS](https://github.com/postcss/postcss) plug-in which removes `background-image` properties with `url()` values
or leaves only its. It allows to separate your layouts CSS from the images CSS to boost speed showing of page.

Installation
--

```bash
$ npm install postcss-bgimage --save-dev
```

Usage
--

Any way of using [PostCSS](https://github.com/postcss/postcss#usage). For example, [Gulp PostCSS](https://github.com/w0rm/gulp-postcss):

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bgImage = require('postcss-bgimage');

gulp.task('compile', function() {
    gulp.src('css/style.css')
        .pipe(postcss([
            bgImage({
                mode: 'cutter'
            })
        ]))
        .pipe(gulp.dest('compiled/css/style.top.css'));

    gulp.src('css/style.css')
        .pipe(postcss([
            bgImage({
                mode: 'cutterInvertor'
            })
        ]))
        .pipe(gulp.dest('compiled/css/style.bottom.css'));
});
```

Result
--

**Input**

```css
/* style.css */

body {
    background-image: url(/path/to/img.png);
    font-family: Arial;
    padding: 20px 10px;
}
```

**Output**

```css
/* style.top.css */

body {
    font-family: Arial;
    padding: 20px 10px;
}
```

```css
/* style.bottom.css */

body {
    background-image: url(/path/to/img.png);
}
```
**Using of the resulting files in HTML**

```html
<!doctype html>
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

To ignore some CSS rules use `/* bgImage: ignore */`. For example:

**Input**

```css
/* style.css */

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

**Output**

```css
/* style.top.css */

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

```css
/* style.bottom.css */

.some-rule {
    background-image: url(/path/to/img1.png);
}
```

Options
--

#### mode
*(required)* Mode of plugin.

- `cutter` - Removes "background:" and "background-image:" properties with external references through "url()" from source CSS.
- `cutterInvertor` - Removes all CSS rules without "background-image" and leaves only this property for other ones.

Test
--

```bash
$ npm test
```

License
--

MIT © Alexander Antonov <alexandr-post@yandex.ru>
