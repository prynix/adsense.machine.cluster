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
  }


  setRequestControllers() {
    this.app.get('/blog', (err, req, res, next) => {
      if (err) return next(err);
      res.render(
        'blog',
        this.contentManager.blogPageResponseBody
      );
    });
    this.app.get('/post', (err, req, res, next) => {
      if (err) return next(err);
      res.render(
        'post',
        this.contentManager.postPageResponseBody
      );
    });
    this.app.get('/', (err, req, res, next) => {
      if (err) return next(err);
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
      this.app.get(`/${article.pathname}`, (err, req, res, next) => {
        if (err) return next(err);
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
    this.app.get('/random', (err, req, res, next) => {
      if (err) return next(err);
      res.redirect(this.randomEndpoint);
    });
  }


  init() {
    setTimeout(() => {
      this
        .setRequestControllers()
        .setLoopRequestControllersByEveryArticle()
        .setRandomPlugin();
    }, 1000);
  }
}