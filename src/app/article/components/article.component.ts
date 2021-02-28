import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from '../store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../store/selectors';
import {currentUserSelector} from '../../auth/store/selectors';
import {map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {deleteArticleAction} from '../store/actions/deleteArticle.action';

@Component({
  selector: 'app-mc-article',
  styleUrls: ['article.component.scss'],
  templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe(
        (article: ArticleInterface | null) => (this.article = article)
      );

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => article?.author.username === currentUser?.username
      )
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
