const PATTERN_URL = /url\([^)]+\)[\s]*/i;

/**
 * Checks value for containing of 'url()'.
 * @param  {string} value
 * @return {boolean}
 */
function hasValueUrl(value) {
    return PATTERN_URL.test(value);
}

module.exports = hasValueUrl;
