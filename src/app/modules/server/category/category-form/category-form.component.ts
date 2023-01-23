import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DisplayType, ICategory } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges, OnDestroy {
  private readonly destroyed$ = new Subject<void>();

  @Input() category!: ICategory;
  @Output() categoryChange = new EventEmitter<ICategory>();

  categoryForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly apiService: ApiService,
    private readonly snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.maxLength(250)]),
      displayOrder: new FormControl(`${DisplayType.alpha}`),
      excludedRoleId: new FormControl(''),
      mutuallyExclusive: new FormControl(''),
      requiredRoleId: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { category } = changes;
    console.log(category);
    if (category) {
      const value = category.currentValue as ICategory;

      this.categoryForm.patchValue({
        name: value.name,
        description: value.description,
        displayOrder: `${value.displayOrder}`,
        excludedRoleId: value.excludedRoleId,
        mutuallyExclusive: value.mutuallyExclusive,
        requiredRoleId: value.requiredRoleId,
      });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  get isPristine() {
    return this.categoryForm.pristine;
  }

  get isValid() {
    return this.categoryForm.valid;
  }

  onSubmit() {
    if (!this.isValid) {
      return this.snackBar.open('Invalid form!', 'Dismiss', {
        politeness: 'assertive',
        panelClass: 'app-notification-error',
      });
    }

    const displayOrder = this.categoryForm.value.displayOrder;
    const updatedCategory = {
      ...this.category,
      ...this.categoryForm.value,
      displayOrder: displayOrder
        ? Number(displayOrder)
        : this.category.displayOrder,
    };

    return this.apiService
      .updateCategory(this.category.guildId, updatedCategory)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((category) => {
        this.snackBar.open(`Successfully updated category!`, 'Ok', {
          panelClass: 'app-notification-success',
        });
        this.categoryForm.markAsPristine();
      });
  }
}
