import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RecentUpdateProductsResponse } from '../store/product/types/ProductInterface';
import { Store } from '@ngrx/store';
import { ProductsService } from 'src/app/services/product/products.service';

@Component({
  selector: 'app-recently-updated',
  templateUrl: './recently-updated.component.html',
  styleUrls: ['./recently-updated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyUpdatedComponent implements OnInit, OnDestroy {
  recentlyUpdated: RecentUpdateProductsResponse[] = [];
  currentPage = 1;
  isRecentUpdateLoaded = false;
  isNext = false;
  isPrev = true;
  limit = 5;
  offset = 0;
  recentUpdatedProducts$: Observable<RecentUpdateProductsResponse[]> =
    new Subject<RecentUpdateProductsResponse[]>();

  unsub$ = new Subject<void>();

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.recentUpdatedProducts$ = this.productService.getRecentUpdateProducts({
      limit: this.limit,
      offset: this.offset,
    });
    this.recentUpdatedProducts$.subscribe((data) => {
      if (data.length > 0) {
        this.isRecentUpdateLoaded = true;
        this.cdr.markForCheck();
      }
      console.log(data);
    });
  }

  nextProductsByPage() {
    this.currentPage += 1;
    this.offset = 5;
    this.isNext = true;
    this.isPrev = false;
  }

  prevProductsByPage() {
    this.currentPage -= 1;
    this.offset = 0;
    this.isNext = false;
    this.isPrev = true;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
