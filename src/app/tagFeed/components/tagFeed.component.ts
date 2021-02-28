import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-mc-tag-feed',
  styleUrls: ['tagFeed.component.scss'],
  templateUrl: 'tagFeed.component.html',
})
export class TagFeedComponent implements OnInit {
  apiUrl: string;
  tagName: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params.slug;
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
