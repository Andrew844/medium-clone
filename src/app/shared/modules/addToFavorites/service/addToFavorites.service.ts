import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../../../types/getArticleResponse.interface';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    return this.http.post(this.getUrl(slug), {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    return this.http.delete(this.getUrl(slug)).pipe(map(this.getArticle));
  }

  private getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  private getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
