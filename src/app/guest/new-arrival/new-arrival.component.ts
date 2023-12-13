import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from 'src/app/services/product/products.service';
import {
  newArrivalProductListActions,
  productListByCategiryNewArrivalActions,
  recentUpdateProductsActions,
} from '../store/product/actions';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import {
  selectNewArrivalList,
  selectProductListByCategoryNewArrival,
  selectRecentProducts,
} from '../store/product/productReducer';
import { ProductInterface } from '../store/product/types/ProductInterface';
import { RecentlyUpdatedComponent } from '../recently-updated/recently-updated.component';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewArrivalComponent implements OnInit {
  newArrival: Array<ProductInterface> = [];
  product: ProductInterface = {};
  recentlyUpdated: Array<ProductInterface> = [];
  limit = 5;
  offset = 0;
  pageSize = 3;
  pageNumber = 0;
  currentPage = 1;
  category = '';
  productCategory = '';
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  isMenCategory: boolean = false;
  isWomenCategory: boolean = false;
  isKidsCategory: boolean = false;
  isCategoryFilter: boolean = false;
  unsub$ = new Subject<void>();

  productsList$ = combineLatest({
    recentUpdates: this.store.select(selectRecentProducts),
    newArrivals: this.store.select(selectNewArrivalList),
    byCategoryProducts: this.store.select(
      selectProductListByCategoryNewArrival
    ),
  });
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.newArrival = [];
    this.recentlyUpdated = [];
    this.store.dispatch(
      recentUpdateProductsActions.recentUpdateProducts({
        request: { limit: 5, offset: 0 },
      })
    );
    this.store.dispatch(
      newArrivalProductListActions.newArrivalProductList({
        request: { pageSize: this.pageSize, pageNumber: this.pageNumber },
      })
    );
    this.productsList$
      .pipe(takeUntil(this.unsub$))
      .subscribe(({ recentUpdates, newArrivals, byCategoryProducts }) => {
        if (recentUpdates) {
          this.recentlyUpdated = recentUpdates;
        }
        if (newArrivals) {
          this.newArrival = newArrivals.content;
          this.isFirstPage = newArrivals.first;
          this.isLastPage = newArrivals.last;
        }

        if (byCategoryProducts) {
          this.newArrival = byCategoryProducts.content;
          this.isFirstPage = byCategoryProducts.first;
          this.isLastPage = byCategoryProducts.last;
        }
      });
  }

  byCategory(category: string) {
    this.isCategoryFilter = true;
    this.category = category;
    this.pageNumber = 0;
    this.currentPage = 1;

    if (category === 'men') {
      this.isMenCategory = true;
      this.isKidsCategory = false;
      this.isWomenCategory = false;
    } else if (category === 'women') {
      this.isMenCategory = false;
      this.isKidsCategory = false;
      this.isWomenCategory = true;
    } else if (category === 'kids') {
      this.isMenCategory = false;
      this.isKidsCategory = true;
      this.isWomenCategory = false;
    }

    if (this.isCategoryFilter) {
      this.store.dispatch(
        productListByCategiryNewArrivalActions.productListByCategoryNewArrival({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    }
  }

  getProductReviewAverage(product: ProductInterface) {
    return [];
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;

    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryNewArrivalActions.productListByCategoryNewArrival({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        newArrivalProductListActions.newArrivalProductList({
          request: { pageNumber: this.pageNumber, pageSize: this.pageSize },
        })
      );
    }
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.currentPage -= 1;
    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryNewArrivalActions.productListByCategoryNewArrival({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        newArrivalProductListActions.newArrivalProductList({
          request: { pageNumber: this.pageNumber, pageSize: this.pageSize },
        })
      );
    }
  }

  resetFilter() {
    window.location.reload();
  }
}
