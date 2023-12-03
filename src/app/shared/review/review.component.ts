import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() starRating: any = 0;
  @Input() value: any = 0;
  @Input() text: string = '';
  @Input() color: string = '';

  constructor() {}
  ngOnInit(): void {}

  lessThanOrEqual(numOne: any, numTwo: any) {
    return numOne <= numTwo;
  }
}
