import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-pagination.component',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class PaginationComponent implements OnInit {
  utilsService = inject(UtilsService);
  
  @Input() total!: number;
  @Input() limit!: number;
  
  @Output() pageChangeEvent = new EventEmitter<number>();

  currentPage!: number;
  pages: Array<number> = [];

  ngOnInit(): void {
    const pageCount = Math.ceil(this.total / this.limit);
    
    this.pages = this.utilsService.range(1, pageCount + 1)
  }

  changePage(pageNumber: number) {
    this.pageChangeEvent.emit(pageNumber);

    this.currentPage = pageNumber;
  }
}
