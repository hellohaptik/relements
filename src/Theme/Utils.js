/**
 *
 * @param {object} obj object
 * @param {boolean} displayLeaf to omit or keep leaf keys
 * @param {string} key key of current iteration
 * @param {Array} path path array
 * @returns
 */
function flattenKeys(obj = {}, displayLeaf = false, key, path = []) {
  if (typeof obj === "string") {
    return displayLeaf
      ? [...path, key].filter(Boolean).join(".")
      : path.filter(Boolean).join(".");
  }
  return Object.keys((key && obj[key]) || obj).map(k =>
    flattenKeys(obj[k], displayLeaf, k, [...path, key]),
  );
}

/**
 *
 * @param {Object} param
 * @param {Object} param.tokenObject token object
 * @param {boolean} param.displayLeaf to omit or keep leaf keys
 * @returns
 */
export function getVariants({ tokenObject, displayLeaf = false }) {
  return [...new Set(flattenKeys(tokenObject, displayLeaf).flat(Infinity))];
}
