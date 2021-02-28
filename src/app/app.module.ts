import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {environment} from '../environments/environment';
import {TopBarModule} from './shared/modules/topBar/topBar.module';
import {PersistenceService} from './shared/services/persistence.service';
import {AuthInterceptor} from './shared/services/auth.interceptor';
import {GlobalFeedModule} from './globalFeed/globalFeed.module';
import {YourFeedModule} from './yourFeed/yourFeed.module';
import {TagFeedModule} from './tagFeed/tagFeed.module';
import {ArticleModule} from './article/article.module';
import {CreateArticleModule} from './createArticle/createArticle.module';
import {EditArticleModule} from './editArticle/editArticle.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './userProfile/userProfile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SettingsModule,
    UserProfileModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    TopBarModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
