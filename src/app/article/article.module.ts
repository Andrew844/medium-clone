import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RouterModule, Routes} from '@angular/router';

import {ArticleComponent} from './components/article.component';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {reducers} from './store/reducers';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {TagListModule} from '../shared/modules/tagList/tagList.module';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffect} from './store/effects/deleteArticle.effect';

const routes: Routes = [{path: 'articles/:slug', component: ArticleComponent}];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule,
  ],
  providers: [SharedArticleService, ArticleService],
  declarations: [ArticleComponent],
})
export class ArticleModule {}
