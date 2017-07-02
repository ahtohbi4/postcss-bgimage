const destructShortcut = require('./destructShortcut');
const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND_IMAGE = /background\-image/i;

/**
 * @param {String} css
 * @return {Boolean}
 */
function cutter(css) {
    destructShortcut(css);

    css.walkDecls(PATTERN_BACKGROUND_IMAGE, (decl) => {
        if (!isNodeIgnored(decl)) {
            decl.remove();
        }
    });

    return css;
}

module.exports = cutter;
