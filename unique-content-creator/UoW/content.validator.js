const LanguageDetector = new (require('languagedetect'));
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
      .replace(/\s+/ig, '-')
      .replace(/[.#«»'”:?!\[\]\|&;\$%®@"<>\(\)\+,]/g, '')
      .toLowerCase();
  }

  static isNotPorn(char) {
    return !/( fuck | porn | sex | anal | gay | cock | ass | boobs)/.test(char);
  }

  static isValidLanguage(text) {
    // const langs = LanguageDetector.detect(text);
    // console.log(langs);
    // todo
    return !/[\а-яА-Я]+/.test(text) && !/[ÀàÂâÆæÇçÈèÉéÊêËëÎîÏïÔôŒœÙùÛûÜüäöüÄÖÜßéÉèÈêÊ]/.test(text);
  }

  static isValidHeader(h1) {
    // todo phone numbers   
    return h1.length >= 15 &&
      h1.length <= 60 &&
      !(h1.includes('200') || h1.includes('40')) &&
      h1.split(' ').length >= 2 &&
      ContentValidator.isValidLanguage(h1) &&
      ContentValidator.isNotPorn(h1);
  }

  static isValidParagraph(p) {
    return p.length > 450 && p.length < 3000 &&
      ContentValidator.isValidLanguage(p) &&
      ContentValidator.isNotPorn(p);
  }
}