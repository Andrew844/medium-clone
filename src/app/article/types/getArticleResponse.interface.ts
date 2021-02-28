import {ArticleInterface} from '../../shared/types/article.interface';

export interface GetArticleResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
