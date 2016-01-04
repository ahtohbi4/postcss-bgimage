var postcss = require('postcss'),
    BG_IMAGE_PATTERN = new RegExp(/background(-image)?/i),
    URL_PATTERN = new RegExp(/url\([^)]+\)/i);

/**
 * Remove or keep only images by url() to optimize page loading
 *
 * @see https://github.com/postcss/postcss/blob/master/docs/api.md
 *
 * @param {Object} options plugin options
 * @return {void}
 */
module.exports = postcss.plugin('postcss-bgimage', function (options) {
    var options = options || {},
        mode = options.mode;

    return function (css) {
        getProcessor(mode)(css);
    }
});

/**
 * @param {String} mode
 * @returns {void}
 */
function getProcessor(mode) {
    switch (mode) {
        case 'cutter':
            return cutter;

        case 'cutterInvertor':
            return cutterInvertor;

        default:
            throw new Error('Unknow mode for postcss-bgimage: ' + mode);
    }
}

/**
 * @param {String} css
 * @returns {Boolean}
 */
function cutter(css) {
    return css.walkDecls(BG_IMAGE_PATTERN, function (decl) {
        if (URL_PATTERN.test(decl.value)) {
            decl.remove();
        }
    });
}

/**
 * @param {String} css
 * @returns {Boolean}
 */
function cutterInvertor(css) {
    return css.walkRules(function (rule) {
        var hasBgImage = false;

        rule.walkDecls(function (decl) {
            if (BG_IMAGE_PATTERN.test(decl.prop) && URL_PATTERN.test(decl.value)) {
                // Declaration has an URL for background property
                hasBgImage = true;

            } else {
                decl.remove();
            }
        });

        if (!hasBgImage) {
            rule.remove();
        }
    });
}
