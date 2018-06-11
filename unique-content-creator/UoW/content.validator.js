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
      .replace(/['”:?!\[\]\|&;\$%@"<>\(\)\+,]/g, '')
      .toLowerCase();
  }

  static isNotPorn(char) {
    return !/( fuck | porn | sex | anal | gay | cock | ass | boobs)/.test(char);
  }

  static isValidLanguage(char) {
    return !/[\а-яА-Я]+/.test(char) && !/[ÀàÂâÆæÇçÈèÉéÊêËëÎîÏïÔôŒœÙùÛûÜüäöüÄÖÜßéÉèÈêÊ]/.test(char);
  }

  static isValidHeader(h1) {
    // todo phone numbers
    if (
      h1.length >= 12 &&
      h1.length <= 60 &&
      !(h1.includes('200') || h1.includes('40')) &&
      h1.split(' ').length >= 2 &&
      ContentValidator.isValidLanguage(h1) &&
      ContentValidator.isNotPorn(h1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  static isValidParagraph(p) {
    if (
      p.length > 350 && p.length < 1500 &&
      ContentValidator.isValidLanguage(p) &&
      ContentValidator.isNotPorn(p)
    ) {
      return true;
    } else {
      return false;
    }
  }

  static isValidImageSRC(src) {
    if (
      /http|https/.test(src) &&
      ContentValidator.isValidLanguage(src) &&
      ContentValidator.isNotPorn(src)
    ) {
      return true;
    } else {
      return false;
    }
  }
}