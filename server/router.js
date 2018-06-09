module.exports = class AdsenseRouter {
  constructor(app, contentManager) {
    this.app = app;
    this.contentManager = contentManager;
  }


  setRequestControllers() {
    this.app.get('/blog', (req, res) => {
      res.render(
        'blog',
        this.contentManager.blogPageResponseBody
      );
    });
    this.app.get('/post', (req, res) => {
      res.render(
        'post',
        this.contentManager.postPageResponseBody
      );
    });
    this.app.get('/', (req, res) => {
      res.render(
        'index',
        this.contentManager.indexPageResponseBody
      );
    });
    return this;
  }

  setLoopRequestControllersByEveryArticle() {
    const
      { articles } = this.contentManager.site,
      { length } = articles;
    for (let i = 0; i < length; i++) {
      const
        prev = articles[i - 1],
        article = articles[i],
        next = articles[i + 1],
        navigation = {};

      if (prev) {
        navigation.prev = {
          href: prev.pathname,
          header: prev.header
        };
      }
      if (next) {
        navigation.next = {
          href: next.pathname,
          header: next.header
        };
      }
      
      this.app.get(`/${article.pathname}`, (req, res) => {
        res.render(
          'post', {
            ...this.contentManager.postPageResponseBody,
            article,
            navigation
          }
        );
      });
    }
    return this;
  }

  setRandomPlugin() {
    this.app.get('/random', (req, res) => {
      res.render(
        'post',
        this.contentManager.randomPageResponseBody
      );
    });
  }


  init() {
    setTimeout(() => {
      this
        .setRequestControllers()
        .setLoopRequestControllersByEveryArticle()
        .setRandomPlugin();
    }, 1500);
  }
}