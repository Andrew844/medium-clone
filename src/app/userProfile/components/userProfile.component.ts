import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {combineLatest, Observable, Subscription} from 'rxjs';

import {getUserProfileAction} from '../store/actions/getUserProfile.action';
import {ProfileInterface} from '../../shared/types/profile.interface';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../store/selectors';
import {currentUserSelector} from '../../auth/store/selectors';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';

@Component({
  selector: 'app-mc-user-profile',
  templateUrl: 'userProfile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  userProfile: ProfileInterface;
  apiUrl: string;
  slug: string;
  isCurrentUserProfile$: Observable<boolean>;

  userProfileSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => currentUser?.username === userProfile?.username
      )
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe(
        (userProfile: ProfileInterface) => (this.userProfile = userProfile)
      );

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');

    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
