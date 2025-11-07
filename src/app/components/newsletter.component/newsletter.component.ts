import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-newsletter.component',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
  imports: [ReactiveFormsModule],

})
export class NewsletterComponent {
  email = new FormControl('');
}
