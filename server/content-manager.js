module.exports = class AdsenseContentManager {

  get indexPageResponseBody() {
    return {
      title: "1lifestyle",
      description: "Барбер клуб для джентельменов",
      info: "Лучшие парикмахерские блоги из тысяч лучших журналов Barber в нашем индексе, используя поисковые и социальные показатели. Данные будут обновляться один раз в неделю.",
      articles: []
    };
  }

  get blogPageResponseBody() {
    return {
      articles: []
    };
  }

  get postPageResponseBody() {
    return {
      articles: []
    };
  }

  get randomPageResponseBody() {
    return {
      article: {
        pathname,
        header,
        img,
        categories,

        author,
        date,
        views,
        comments,

        paragraphs
      },
      categories,
      freshArticles,
      prev, next
    };
  }


  constructor(collection) {
    this.collection = collection;
  }


  pullOutArticles() {
    this.collection.getAllArticles()
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}