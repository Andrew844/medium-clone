import {NgModule} from '@angular/core';
import {PopularTagsComponent} from './components/popularTags.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {GetPopularTagsEffect} from './store/effects/getPopularTags.effect';
import {PopularTagsService} from './services/popularTags.service';
import {LoadingModule} from '../loading/loading.module';
import {CommonModule} from '@angular/common';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    LoadingModule,
    ErrorMessageModule,
    RouterModule,
  ],
})
export class PopularTagsModule {}
