type Site = {
  domain: string;
  title: string;
  description: string;
  info: string;
  categories: Array<string>;
  advBlocks: Array<string>;
  articles: Articles;
};



type Article = {
  pathname: string;
  header: string;
  img: string;
  categories: Array<string>;

  meta: {
    author: string;
    date: string;
    views: number;
    comments: number;
  }

  paragraphs: Array<string>;
};



type Articles = Array<Article>;