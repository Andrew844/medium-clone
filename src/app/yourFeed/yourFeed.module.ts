import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YourFeedComponent} from './components/yourFeed.component';
import {RouterModule, Routes} from '@angular/router';
import {FeedModule} from '../shared/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module';
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module';

const routes: Routes = [{path: 'feed', component: YourFeedComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
  declarations: [YourFeedComponent],
})
export class YourFeedModule {}
