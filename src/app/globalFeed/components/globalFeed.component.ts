import {Component} from '@angular/core';

@Component({
  selector: 'app-mc-global-feed',
  styleUrls: ['globalFeed.component.scss'],
  templateUrl: 'globalFeed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
