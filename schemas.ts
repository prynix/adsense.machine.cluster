type Site = {
  domain: string;
  title: string;
  description: string;
  info: string;
  categories: Array<string>;
  advBlocks: Array<string>;
  articles: Articles;
};




type Navigation = {
  href: string;
  header: string;
};


type Article = {
  pathname: string;
  title: string;
  img: string;
  categories: Array<string>;

  navigation: {
    prev: Navigation;
    next: Navigation;
  };

  paragraphs: Array<string>;
};



type Articles = Array<Article>;