const PATTERN_IGNORE = /[\s]*bgImage[\s]*:[\s]*ignore[\s]*/i;

/**
 * Checks instruction to ignore the node.
 *
 * @param  {Node} node
 *
 * @returns {boolean}
 */
export default function isNodeIgnored(node) {
  const { parent } = node;

  if (!parent) {
    // Root was reached.
    return false;
  }

  if (parent.some((child) => (child.type === 'comment' && PATTERN_IGNORE.test(child.text)))) {
    // Instruction to ignore the node was detected.
    return true;
  }

  // Check the instruction on one level above.
  return isNodeIgnored(parent);
}
