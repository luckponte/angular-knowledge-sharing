import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { By } from '@angular/platform-browser';

describe('ErrorMessage', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default message', () => {
    const messageContainer = getElement(fixture, "[data-testid='message-container']")

    expect(messageContainer.textContent).toEqual('Oops');
  });

  it('should render custom message', () => {
    component.message = "Error";
    fixture.detectChanges()

    const messageContainer = getElement(fixture, "[data-testid='message-container']")

    expect(messageContainer.textContent).toEqual('Error');
  });
});

function getElement(fixture: ComponentFixture<any>, selector: string) {
  return fixture.debugElement.query(By.css(selector)).nativeElement;
}
