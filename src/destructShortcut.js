const cssColorList = require('css-color-list');

const isNodeIgnored = require('./isNodeIgnored');

const PATTERN_BACKGROUND = /background(?!\-)/i;
const PATTERN_GRADIENT = /[a-z-]*gradient\((?:(?:hls|rgb)a?\([^()]*\)[^,]*[,]?|[^,]+[,]?)+\)/i;
const PATTERN_URL = /url\([^)]+\)[\s]*/i;

// @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
const colorList = cssColorList();
const PATTERN_COLOR = `(?:(?:rgb|hls)a?[(][^)]*[)]|#[0-9a-f]{3,8}|${colorList.join('|')})`;
const PATTERN_START_BACKGROUND_COLOR = new RegExp(`^${PATTERN_COLOR}[\s]*`, 'i');
const PATTERN_END_BACKGROUND_COLOR = new RegExp(`[\s]*${PATTERN_COLOR}$`, 'i');

/**
 * Destruction of shortcut 'background' by prop 'background-image' and the rest props.
 * @param {string} css
 */
function destructShortcut(css) {
    css.walkDecls(PATTERN_BACKGROUND, (decl) => {
        if (!isNodeIgnored(decl)) {
            const value = decl.value;
            const hasURL = PATTERN_URL.test(value);

            if (hasURL) {
                let valueStartBgColor = '';
                let valueEndBgColor = '';
                const layers = value
                    .replace(PATTERN_START_BACKGROUND_COLOR, (match) => {
                        valueStartBgColor = match;

                        return '';
                    })
                    .replace(PATTERN_END_BACKGROUND_COLOR, (match) => {
                        valueEndBgColor = match;

                        return '';
                    })
                    .split(/,/)
                    .reduce((result, subLine, index) => {
                        if (index === 0) {
                            return [
                                subLine,
                            ];
                       }

                        const indexLast = result.length - 1;
                        const subLineLast = result[indexLast];

                        if ((subLineLast.match(/\(/g) || []).length !== (subLineLast.match(/\)/g) || []).length) {
                            result[indexLast] += `,${subLine}`;

                            return result;
                        }

                        return [
                            ...result,
                            subLine,
                        ];
                    }, []);
                const isMultiple = layers.length > 1;

                // Calculate 'background-image' value
                const valueURL = layers
                    .map((layer) => {
                        const hasURLValue = PATTERN_URL.test(layer);
                        const valueGradient = layer.match(PATTERN_GRADIENT) ? layer.match(PATTERN_GRADIENT)[0] : null;

                        if (hasURLValue) {
                            return layer
                                .replace(/(?:[^\s]+[\s]+)*(url\([^)]*\))(?:[\s]+[^\s]+)*/ig, '$1');
                        }

                        if (valueGradient) {
                            return layer
                                .replace(/([^\s]+(?:[\s]+[^\s]+)*)/ig, valueGradient);
                        }

                        return layer
                            .replace(/[^\s]+(?:[\s]+[^\s]+)*/ig, 'initial');
                    })
                    .join(',');

                decl.cloneAfter({
                    prop: 'background-image',
                    value: valueURL.trim(),
                });

                // Calculate 'background' value
                const valueRest = layers
                    .map((layer) => {
                        const hasURLValue = PATTERN_URL.test(layer);

                        if (!hasURLValue) {
                            return layer;
                        }

                        return layer
                            .replace(
                                /([^\s]+[\s]+)*(?:url\([^)]*\)(?:[\s]+(?=[^\s]))?)([^\s]+[\s]*[^\s]+)*/ig,
                                (match, group1, group2) => {
                                    const startPart = group1 || '';
                                    const endPart = group2 || '';
                                    const result = (`${startPart}${endPart}`);

                                    if (isMultiple && !result.trim()) {
                                        return `${startPart}initial${endPart}`;
                                    }

                                    return result;
                                }
                            );
                    })
                    .join(',');

                if (
                    !valueStartBgColor.trim() &&
                    !valueEndBgColor.trim() &&
                    !valueRest.replace(/(?:initial)|[\s,]+/ig, '')
                ) {
                    decl.remove();
                } else {
                    decl.replaceWith(decl.clone({
                        value: `${valueStartBgColor}${valueRest}${valueEndBgColor}`.trim(),
                    }));
                }
            }
        }
    });
}

module.exports = destructShortcut;
