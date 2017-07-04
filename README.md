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

> [PostCSS](https://github.com/postcss/postcss) plugin which removes `background-image` properties with `url()` values
or leaves only its. It allows to separate your layouts CSS from the images CSS to boost a speed of showing a page.

:boom: **Note!** The plugin only removes CSS declarations. Do not expect cleaning empty rules after that. Use special plugins for it ([csso](https://github.com/css/csso), [cssnano](http://cssnano.co/) and other).

Installation
--

```bash
$ npm install postcss-bgimage --save-dev
```

or

```bash
$ yarn add postcss-bgimage --dev
```

Usage
--

Any way of using [PostCSS](https://github.com/postcss/postcss#usage). For example, [Gulp PostCSS](https://github.com/w0rm/gulp-postcss):

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bgImage = require('postcss-bgimage');

gulp.task('compile', function () {
    gulp.src('css/style.css')
        .pipe(postcss([
            bgImage({
                mode: 'cutter',
            })
        ]))
        .pipe(gulp.dest('compiled/css/style.top.css'));

    gulp.src('css/style.css')
        .pipe(postcss([
            bgImage({
                mode: 'cutterInvertor',
            })
        ]))
        .pipe(gulp.dest('compiled/css/style.bottom.css'));
});
```

Result
--

### Common use

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

### Using with shortcut `background`

**Input**

```css
/* style.css */

#some {
    display: flex;
    background: #f30 url(/path/to/img.png) 50% no-repeat;
    color: #fff;
}
```

**Output**

```css
/* style.top.css */

#some {
    display: inline-block;
    background: #f30 50% no-repeat;
    color: #fff;
}
```

```css
/* style.bottom.css */

#some {
    background-image: url(/path/to/img.png);
}
```

### Using in nested at-rules

**Input**

```css
/* style.css */

@media (min-width: 320px) {
    .title + .list > li {
        background: url(/path/to/img.png);
    }

    @supports (display: flex) {
        .panel {
            display: flex;
            background: url(/path/to/img.png);
        }
    }

    .panel {
        display: block;
    }
}
```

**Output**

```css
/* style.top.css */

@media (min-width: 320px) {
    .title + .list > li {
    }

    @supports (display: flex) {
        .panel {
            display: flex;
        }
    }

    .panel {
        display: block;
    }
}
```

```css
/* style.bottom.css */

@media (min-width: 320px) {
    .title + .list > li {
        background: url(/path/to/img.png);
    }

    @supports (display: flex) {
        .panel {
            background: url(/path/to/img.png);
        }
    }

    .panel {
    }
}
```

### Ignore rules

To ignore some CSS rules use comment `/* bgImage: ignore */`. For example:

**Input**

```css
/* style.css */

.some-rule {
    display: inline-block;
    /* bgImage: ignore */
    background: url(/path/to/img2.png);
}

@media (min-width: 320px) {
    /* bgImage: ignore */
    @supports (--color: red) {
        .some-rule {
            background: url(/path/to/img2.png);
            color: var(--color);
        }
    }

    .some-rule {
        display: inline-block;
        background: url(/path/to/img2.png);
    }
}
```

**Output**

```css
/* style.top.css */

.some-rule {
    display: inline-block;
    /* bgImage: ignore */
    background: url(/path/to/img2.png);
}

@media (min-width: 320px) {
    /* bgImage: ignore */
    @supports (--color: red) {
        .some-rule {
            background: url(/path/to/img2.png);
            color: var(--color);
        }
    }

    .some-rule {
        display: inline-block;
        background: url(/path/to/img2.png);
    }
}
```

```css
/* style.bottom.css */

.some-rule {
}

@media (min-width: 320px) {
    /* bgImage: ignore */
    @supports (--color: red) {
        .some-rule {
        }
    }

    .some-rule {
    }
}
```

### Using of the resulting files in HTML

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
</body>
</html>
<link rel="stylesheet" href="/compiled/css/style.bottom.css">
```

Options
--

#### mode
*(required)* Mode of the plugin.

- `cutter` - Removes `background-image:` properties with external references through `url()` from
source CSS.
- `cutterInvertor` - Removes all CSS rules without `background-image` and leaves only this property for other ones.

Test
--

```bash
$ npm test
```

or

```bash
$ yarn test
```

License
--

MIT © Alexander Antonov <alexandr-post@yandex.ru>
