const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND = /background(?!\-)/i;
const PATTERN_URL = /url\([^)]+\)/i;

/**
 * Destruction of shortcut 'background' by prop 'background-image' and the rest props.
 * @param {string} css
 */
function destructShortcut(css) {
    css.walkDecls(PATTERN_BACKGROUND, (decl) => {
        if (!isNodeIgnored(decl)) {
            const value = decl.value;
            const urlMatch = value.match(PATTERN_URL);
            const valueURL = urlMatch ? urlMatch[0] : null;
            const valueRest = value
                .replace(PATTERN_URL, '')
                .replace(/[\s]{2,}/, ' ')
                .trim();

            if (valueURL) {
                decl.cloneAfter({
                    prop: 'background-image',
                    value: valueURL,
                });
            }

            if (valueRest) {
                decl.replaceWith(decl.clone({
                    value: valueRest,
                }));
            } else {
                decl.remove();
            }
        }
    });
}

module.exports = destructShortcut;
