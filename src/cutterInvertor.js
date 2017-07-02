const destructShortcut = require('./destructShortcut');
const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND_IMAGE = /background\-image/i;
const IGNORING_AT_RULES_NAMES = [
    'charset',
    'import',
    'namespace',
];

/**
 * @param {String} css
 * @return {Boolean}
 */
function cutterInvertor(css) {
    destructShortcut(css);

    css.walkDecls((decl) => {
        if (isNodeIgnored(decl) || !PATTERN_BACKGROUND_IMAGE.test(decl.prop)) {
            decl.remove();
        }
    });

    css.walkAtRules((rule) => {
        if (IGNORING_AT_RULES_NAMES.indexOf(rule.name) !== -1) {
            rule.remove();
        }
    });

    return css;
}

module.exports = cutterInvertor;
