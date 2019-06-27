import destructShorthand from './destructShorthand';
import hasValueUrl from './hasValueUrl';
import isNodeIgnored from './isNodeIgnored';

const PATTERN_BACKGROUND_IMAGE = /background-image/i;

/**
 * @param {string} css
 */
export default function cutter(css) {
  destructShorthand(css);

  css.walkDecls(PATTERN_BACKGROUND_IMAGE, (decl) => {
    if (hasValueUrl(decl.value) && !isNodeIgnored(decl)) {
      decl.remove();
    }
  });
}
