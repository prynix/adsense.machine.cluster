module.exports = class AdsenseRouter {

  get randomEndpoint() {
    const
      { contentManager } = this,
      i = contentManager.getRandomArticleIndex();
    return `/${contentManager.site.articles[i].pathname}`;
  }


  constructor(app, contentManager) {
    this.app = app;
    this.contentManager = contentManager;
    this.router = require('express').Router();
  }


  setRequestControllers() {
    this.router.get('/', (req, res) => {
      res.render(
        'index',
        this.contentManager.indexPageResponseBody
      );
    });
    this.router.get('/blog', (req, res) => {
      res.render(
        'blog',
        this.contentManager.blogPageResponseBody
      );
    });
    this.router.get('/post', (req, res) => {
      res.render(
        'post',
        this.contentManager.postPageResponseBody
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
      this.router.get(`/${article.pathname}`, (req, res) => {
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
    this.router.get('/random', (req, res) => {
      res.redirect(this.randomEndpoint);
    });
    return this;
  }

  handleErrors() {
    this.app.use('/', this.router);

    this.app.use((req, res) => {
      res.render(
        'blog',
        this.contentManager.blogPageResponseBody
      );
    });
  }


  init() {
    this
      .setRequestControllers()
      .setLoopRequestControllersByEveryArticle()
      .setRandomPlugin()
      .handleErrors();
  }
}