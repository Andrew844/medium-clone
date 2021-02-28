import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {updateArticleAction} from '../../store/actions/updateArticle.action';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {filter, map} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';

@Component({
  selector: 'app-mc-edit-article',
  templateUrl: 'editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  isLoading$: Observable<boolean>;
  initialValues$: Observable<ArticleInputInterface>;

  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }))
    );

    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }
}
