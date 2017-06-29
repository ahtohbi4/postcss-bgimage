/**
 * Remove or keep only images by url() to optimize page loading
 *
 * @see http://api.postcss.org/
 */
var postcss = require('postcss'),
    PATTERN_IGNORE = /[\s]*bgImage[\s]*:[\s]*ignore[\s]*/i,
    PATTERN_BG_IMAGE = /background(-image)?/i,
    PATTERN_URL = /url\([^)]+\)/i;

/**
 * @method ignoreChecking
 * @param {Object} rule
 * @return {Boolean}
 */
function ignoreChecking(rule) {
    var result = false;

    rule.walkComments(function (comment) {
        if (PATTERN_IGNORE.test(comment.text)) {
            result = true;
        }
    });

    return result;
}

/**
 * @param {String} css
 * @return {Boolean}
 */
function cutter(css) {
    return css.walkRules(function (rule) {
        var ignored = ignoreChecking(rule);

        if (!ignored) {
            rule.walkDecls(PATTERN_BG_IMAGE, function (decl) {
                if (PATTERN_URL.test(decl.value)) {
                    decl.remove();
                }
            });
        }
    });
}

/**
 * @param {String} css
 * @return {Boolean}
 */
function cutterInvertor(css) {
    return css.each(function (node) {
        if (node.type === 'rule') {
            var isIgnored = ignoreChecking(node),
                hasBgImage = false;

            node.walkDecls(function (decl) {
                if (!isIgnored && PATTERN_BG_IMAGE.test(decl.prop) && PATTERN_URL.test(decl.value)) {
                    hasBgImage = true;
                } else {
                    decl.remove();
                }
            });

            if (!hasBgImage) {
                node.remove();
            }
        } else {
            node.remove();
        }
    });
}

/**
 * @param {String} mode
 * @return {void}
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
 * @param {Object} options plugin options
 * @return {void}
 */
module.exports = postcss.plugin('postcss-bgimage', function (opt) {
    var options = opt || {},
        mode = options.mode;

    return function (css) {
        getProcessor(mode)(css);
    };
});
