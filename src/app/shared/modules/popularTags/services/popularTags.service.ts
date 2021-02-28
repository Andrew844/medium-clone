import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {PopularTagType} from '../types/popularTag.type';
import {map} from 'rxjs/operators';
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    return this.http
      .get(`${environment.apiUrl}/tags`)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags));
  }
}
