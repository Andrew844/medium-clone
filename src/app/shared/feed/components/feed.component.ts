import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from '../store/actions/getFeed.action';
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';
import {Observable, Subscription} from 'rxjs';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../store/selectors';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {parseUrl, stringify} from 'query-string';
import {CurrentUserInterface} from '../../types/currentUser.interface';
import {currentUserSelector} from '../../../auth/store/selectors';

@Component({
  selector: 'app-mc-feed',
  styleUrls: ['feed.component.scss'],
  templateUrl: 'feed.component.html',
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  currentUser$: Observable<CurrentUserInterface | null>;

  limit = environment.limit;
  baseUrl: string;
  currentPage = 1;
  queryParamsSubscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      }
    );
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringigfiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringigfiedParams}`;
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }
}
