import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
  standalone: true
})
export class ErrorMessageComponent
 {
  @Input() message = 'Oops';
}
