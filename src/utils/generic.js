/**
 * Converts a hex value to an rgba value with the given opacity.
 * @param {String} hex
 * @param {Number} opacity
 * @returns {String} rgba(251,175,255,1)
 */
export function rgba(hex, opacity) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ",",
    )},${opacity})`;
  }

  return hex;
}

export function isValidURL(str) {
  /*	 * @param {Number} opacity
    validUrlList = [	 * @returns {String} rgba(251,175,255,1)
      "https://www.google.com",
      "http://www.google.com",
      "https://www.google.com/awd",
      "https://www.google.com/awd?w=654&h=890",
    ]
    invalidUrlList = [	
      "[test_image]",	
      "{this}",	
      "only_text"	
    ]	
  */

  // eslint-disable-next-line no-useless-escape, max-len
  return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
    str,
  );
}
