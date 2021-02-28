import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {SaveArticleResponseInterface} from '../../shared/types/saveArticleResponse.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    return this.http
      .put<SaveArticleResponseInterface>(
        `${environment.apiUrl}/articles/${slug}`,
        articleInput
      )
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
