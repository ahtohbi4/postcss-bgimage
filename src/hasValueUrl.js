const PATTERN_URL = /url\([^)]+\)[\s]*/i;

/**
 * Checks value for containing of 'url()'.
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export default function hasValueUrl(value) {
  return PATTERN_URL.test(value);
}
