import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterComponent } from './newsletter.component';
import { By } from '@angular/platform-browser';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive an e-mail', () => {
    const emailEl = fixture.debugElement.query(By.css("input[type='email']")).nativeElement;
    
    emailEl.value = 'foo@bar.com';
    // emailEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.email.value).toBe('foo@bar.com')
  });
});
