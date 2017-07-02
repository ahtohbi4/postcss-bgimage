const destructShortcut = require('./destructShortcut');
const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND_IMAGE = /background\-image/i;

/**
 * @param {string} css
 */
function cutter(css) {
    destructShortcut(css);

    css.walkDecls(PATTERN_BACKGROUND_IMAGE, (decl) => {
        if (!isNodeIgnored(decl)) {
            decl.remove();
        }
    });
}

module.exports = cutter;
