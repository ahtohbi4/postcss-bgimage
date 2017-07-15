const destructShorthand = require('./destructShorthand');
const hasValueUrl = require('./hasValueUrl');
const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND_IMAGE = /background\-image/i;

/**
 * @param {string} css
 */
function cutter(css) {
    destructShorthand(css);

    css.walkDecls(PATTERN_BACKGROUND_IMAGE, (decl) => {
        if (hasValueUrl(decl.value) && !isNodeIgnored(decl)) {
            decl.remove();
        }
    });
}

module.exports = cutter;
