import {Component, Input} from '@angular/core';
import {PopularTagType} from '../../popularTags/types/popularTag.type';

@Component({
  selector: 'app-mc-tag-list',
  templateUrl: 'tagList.component.html',
})
export class TagListComponent {
  @Input('tags') tagsProps: PopularTagType[];
}
