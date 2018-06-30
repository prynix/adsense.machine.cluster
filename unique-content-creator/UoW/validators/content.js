/*
*   @see
*   https://github.com/FGRibreau/node-language-detect
*/
module.exports = class ContentValidator {

  static sanitize(untrustedText) {
    return untrustedText.replace(/<[^>]+>/ig, '');
  }

  static beautifyParagraph(uglyParagraph) {
    return uglyParagraph.replace(/\s+/ig, ' ');
  }

  static beautifyPathname(uglyPathname) {
    return uglyPathname
      .trimStart()
      .trimEnd()
      .replace(/\s+/ig, '-')
      .replace(/[.#«»'”:?!\[\]\|&;\$%®@"<>\(\)\+,]/g, '')
      .toLowerCase();
  }

  static isNotPorn(char) {
    return !/( fuck | porn | sex | anal | gay | cock | ass | boobs)/.test(char);
  }

  static isValidLanguage(text) {
    return !/[\а-яА-Я]+/.test(text) && !/[ÀàÂâÆæÇçÈèÉéÊêËëÎîÏïÔôŒœÙùÛûÜüäöüÄÖÜßéÉèÈêÊ]/.test(text);
  }

  static isValidHeader(header) {
    let h1 = header.trimStart().trimEnd();
    return h1.length >= 15 &&
      h1.length <= 60 &&
      !/(40|200|\[edit\])/.test(h1) &&
      h1.split(' ').length >= 2 &&
      ContentValidator.isValidLanguage(h1) &&
      ContentValidator.isNotPorn(h1);
  }

  static isValidParagraph(p) {
    return p.length > 350 && p.length < 3000 &&
      ContentValidator.isValidLanguage(p) &&
      ContentValidator.isNotPorn(p);
  }
}