import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';

import {FeedComponent} from './components/feed.component';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {reducers} from './store/reducers';
import {FeedService} from './services/feed.service';
import {ErrorMessageModule} from '../modules/errorMessage/errorMessage.module';
import {LoadingModule} from '../modules/loading/loading.module';
import {PaginationModule} from '../modules/pagination/pagination.module';
import {TagListModule} from '../modules/tagList/tagList.module';
import {AddToFavoritesModule} from '../modules/addToFavorites/addToFavorites.module';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule,
  ],
  providers: [FeedService],
  declarations: [FeedComponent],
  exports: [FeedComponent],
})
export class FeedModule {}
