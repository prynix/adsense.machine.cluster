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
    this.app.get('*', (req, res) => {
      res.render(
        'index',
        this.contentManager.indexPageResponseBody
      );
    });
    return this;
  }

  setLoopRequestControllersByEveryArticle() {
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
    this
      .setRequestControllers()
      .setLoopRequestControllersByEveryArticle()
      .setRandomPlugin();
  }
}