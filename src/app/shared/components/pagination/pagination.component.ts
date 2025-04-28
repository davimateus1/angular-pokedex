import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() total = 0;
  @Input() limit = 20;
  @Input() offset = 0;
  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;
  totalPages: number[] = [];
  pageRange: number[] = [];

  ngOnChanges() {
    this.currentPage = Math.floor(this.offset / this.limit) + 1;
    const totalPagesCount = Math.ceil(this.total / this.limit);
    this.totalPages = Array(totalPagesCount)
      .fill(0)
      .map((_, i) => i + 1);

    this.updatePageRange();
  }

  updatePageRange() {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages.length, this.currentPage + 2);

    this.pageRange = this.totalPages.slice(startPage - 1, endPage);
  }

  changePage(direction: 'prev' | 'next') {
    if (direction === 'prev' && this.offset > 0) {
      this.pageChange.emit(this.offset - this.limit);
    }
    if (direction === 'next' && this.offset + this.limit < this.total) {
      this.pageChange.emit(this.offset + this.limit);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit((page - 1) * this.limit);
  }
}
