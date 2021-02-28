import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mc-error-message',
  template: '<div>{{messageProps}}</div>',
})
export class ErrorMessageComponent {
  @Input('message') messageProps = 'Something went wrong';
}
