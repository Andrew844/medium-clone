import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileInterface} from '../../shared/types/profile.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    return this.http
      .get<GetUserProfileResponseInterface>(
        `${environment.apiUrl}/profiles/${slug}`
      )
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      );
  }
}
