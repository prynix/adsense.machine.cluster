/*
*   @see
*   https://gist.github.com/joepie91/c0069ab0e0da40cc7b54b8c2203befe1
*/
module.exports = class AdsenseRouter {
  constructor(app) {
    this.app = app;
  }

  pullOutArticles() {
    new MongoDBManager().getAllArticles()
  }

  setAllHandlers() {
    this.app.get('/', function (req, res) {
      res.render("index", {
        title: "1lifestyle",
        description: "Барбер клуб для джентельменов",
        info: "Лучшие парикмахерские блоги из тысяч лучших журналов Barber в нашем индексе, используя поисковые и социальные показатели. Данные будут обновляться один раз в неделю.",
        articles: []
      });
    });
    this.app.get('/blog', function (req, res) {
      res.render("blog", {
        articles: []
      });
    });
    this.app.get('/post', function (req, res) {
      res.render("post", {
        articles: []
      });
    });
  }


  setRandomPlugin() {
    this.app.get('/random', function (req, res) {
      const { pathname, img, header, paragraphs } = a;
      res.render("post", {
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
      });
    });
  }


  setup() {
    this.setAllHandlers();
    this.setRandomPlugin();
  }
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}