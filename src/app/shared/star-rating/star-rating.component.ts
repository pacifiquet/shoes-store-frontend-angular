import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/product/products.service';
import { Observable, Subject, take } from 'rxjs';
import { ReviewInterface } from 'src/app/guest/store/product/types/ProductInterface';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() productId!: any;
  commentValue: string = '';
  hoveredIndex: number = -1;
  reviewId!: number;
  form: any;
  editingReview: boolean = false;
  addedReview = false;
  ratingValue = 0;
  ratingControl = new FormControl(0);
  addReviewData$: Observable<ReviewInterface> = new Subject<ReviewInterface>();
  addReviewDetail$: Observable<ReviewInterface> =
    new Subject<ReviewInterface>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = fb.group({
      comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  getRating() {
    this.ratingValue = Number(this.ratingControl.value);
  }

  updateComment() {
    this.commentValue = 'Bad comment';
  }

  getValue(comment: any) {
    return comment;
  }

  editReview(id: any) {
    this.reviewId = id;
    this.editingReview = true;
    this.commentValue = 'Bad comment';
    if (this.reviewId) {
      this.addReviewDetail$ = this.productService.getReview(this.reviewId);
    }

    this.addReviewDetail$.pipe(take(1)).subscribe(({ comment }) => {
      if (comment) {
        this.commentValue = comment;
      }
    });

    this.addedReview = false;
  }

  saveReview(form: any) {
    const comment = form.value['comment'];
    const request = {
      comment: comment,
      rating: Number(this.ratingValue),
    };
    this.addReviewData$ = this.productService.productAddReview(
      request,
      this.productId
    );

    this.addedReview = true;
  }

  saveUpdateReview(form: any) {
    const comment = form.value['comment'];
    const request = {
      comment: comment,
      rating: Number(this.ratingValue),
    };

    this.addReviewData$ = this.productService.updateReview(
      this.reviewId,
      request
    );
    this.addedReview = true;
  }
}
