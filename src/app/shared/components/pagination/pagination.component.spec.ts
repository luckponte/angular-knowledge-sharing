import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { UtilsService } from '../../services/utils.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [UtilsService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct pagination', () => {
    setupComponent(20, 5);
    
    const pageContainers = getAllElements('[data-testid="page-container"]');
    
    expect(pageContainers.length).toBe(4);
    expect(pageContainers[0].nativeElement.textContent).toBe('1');
    expect(pageContainers[3].nativeElement.textContent).toBe('4');
  });

  it('should emit clicked page', () => {
    setupComponent();

    const pageContainers = getAllElements('[data-testid="page-container"]');

    let clickedPage: number | undefined;
    component.pageChangeEvent.subscribe((page) => {
      clickedPage = page;
    });

    pageContainers[4].triggerEventHandler('click');
    expect(clickedPage).toBe(5);
    expect(component.currentPage).toBe(5);

    pageContainers[0].triggerEventHandler('click');
    expect(clickedPage).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should show empty list when there is no total', () => {
    setupComponent(0);

    const pageContainers = getAllElements('[data-testid="page-container"]');

    expect(pageContainers).toEqual([]);
  });

  function getAllElements(selector: string) {
    return fixture.debugElement.queryAll(
      By.css(selector)
    )
  }

  function setupComponent(totalInput: number = 50, limitInput:number = 10) {
    fixture.componentRef.setInput('total', totalInput);
    fixture.componentRef.setInput('limit', limitInput);
    fixture.detectChanges();
  }
});


