import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss'],
})
export class CardRowComponent {
  @Input() expanded?: boolean;
}
