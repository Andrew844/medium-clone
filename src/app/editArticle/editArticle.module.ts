import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RouterModule, Routes} from '@angular/router';

import {EditArticleComponent} from './components/editArticle/editArticle.component';
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module';
import {EditArticleService} from './services/editArticle.service';
import {UpdateArticleEffect} from './store/effects/updateArticle.effect';
import {reducers} from './store/reducers';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {LoadingModule} from '../shared/modules/loading/loading.module';

const routes: Routes = [
  {path: 'articles/:slug/edit', component: EditArticleComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
