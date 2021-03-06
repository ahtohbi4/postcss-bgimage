import destructShorthand from './destructShorthand';
import hasValueUrl from './hasValueUrl';
import isNodeIgnored from './isNodeIgnored';

const PATTERN_BACKGROUND_IMAGE = /background-image/i;
const IGNORING_AT_RULES_NAMES = [
  'charset',
  'import',
  'namespace',
];

/**
 * @param {string} css
 */
export default function cutterInvertor(css) {
  destructShorthand(css);

  css.walkDecls((decl) => {
    if (isNodeIgnored(decl) || !hasValueUrl(decl.value) || !PATTERN_BACKGROUND_IMAGE.test(decl.prop)) {
      decl.remove();
    }
  });

  css.walkAtRules((rule) => {
    if (IGNORING_AT_RULES_NAMES.indexOf(rule.name) !== -1) {
      rule.remove();
    }
  });
}
