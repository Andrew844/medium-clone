import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../types/article.interface';
import {GetArticleResponseInterface} from '../types/getArticleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    return this.http
      .get<GetArticleResponseInterface>(
        `${environment.apiUrl}/articles/${slug}`
      )
      .pipe(map((response: GetArticleResponseInterface) => response.article));
  }
}
