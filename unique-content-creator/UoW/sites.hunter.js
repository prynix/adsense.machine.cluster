const fetch = require('./fetch');



module.exports = class SitesHunter {
  constructor(keywords) {
    this.keywords = keywords;
    this.searchEngineURLs = [];
    this.contentSitesURLs = new Set();
  }


  buildSearchEngineURLs() {
    const { keywords, searchEngineURLs } = this;
    keywords.forEach(
      category =>
        [2, 3, 4].forEach(
          i =>
            searchEngineURLs.push(
              `https://www.bing.com/search?q=${category}&first=${i}1`
            )
        )
    );
  }

  async fetchContentSitesURLs() {
    const
      { searchEngineURLs } = this,
      { length } = searchEngineURLs;
    for (let i = 0; i < length; i++) {
      try {
        const $ = await fetch(searchEngineURLs[i]);
        $('ol#b_results li.b_algo a').each((i, link) =>
          this.contentSitesURLs.add($(link).attr('href'))
        );
      } catch (e) {
        console.error(e);
      }
    }
  }

  async scrape() {
    this.buildSearchEngineURLs();
    await this.fetchContentSitesURLs();
    return Array.from(this.contentSitesURLs);
  }
}