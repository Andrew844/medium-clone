import {Component} from '@angular/core';

@Component({
  selector: 'app-mc-your-feed',
  styleUrls: ['yourFeed.component.scss'],
  templateUrl: 'yourFeed.component.html',
})
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
