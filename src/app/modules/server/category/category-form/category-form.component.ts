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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DisplayType, ICategory } from 'src/app/shared/types/interfaces';
import { GuildService } from '../../server.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges, OnDestroy {
  private readonly destroyed = new Subject<void>();

  @Input() category!: ICategory;
  @Output() updatedCategory = new EventEmitter<ICategory>();

  categoryForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar,
    private readonly guildService: GuildService
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
    this.destroyed.next();
  }

  get isPristine() {
    return this.categoryForm.pristine;
  }

  get isValid() {
    return this.categoryForm.valid;
  }

  openDialog() {}

  removeCategory() {
    this.guildService.deleteCategory(this.category.guildId, this.category);
  }

  onSubmit() {
    if (!this.isValid) {
      return this.snackbar.open('Invalid form!', 'Dismiss', {
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

    this.categoryForm.markAsPristine();
    return this.updatedCategory.emit(updatedCategory);
  }
}
