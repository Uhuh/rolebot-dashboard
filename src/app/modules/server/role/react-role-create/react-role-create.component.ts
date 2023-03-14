import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import {
  ICategory,
  IGuildEmoji,
  IGuildRole,
} from 'src/app/shared/types/interfaces';

export interface DialogData {
  categories: ICategory[];
  roles: IGuildRole[];
  emojis: IGuildEmoji[];
}

@Component({
  selector: 'app-react-role-create',
  templateUrl: './react-role-create.component.html',
  styleUrls: ['./react-role-create.component.scss'],
})
export class ReactRoleCreateComponent implements OnInit {
  customEmojiToggle = new FormControl(false);

  role = new FormControl<string | IGuildRole>('', [Validators.required]);
  filteredRoles: Observable<IGuildRole[]> = new Observable();

  category = new FormControl<string | ICategory>('');
  filteredCategories: Observable<ICategory[]> = new Observable();

  emoji = new FormControl<string | IGuildEmoji>('', [Validators.required]);
  filteredEmojis: Observable<IGuildEmoji[]> = new Observable();

  description = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData,
    private readonly dialogRef: MatDialogRef<ReactRoleCreateComponent>,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.filteredRoles = this.role.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return this._filterRoles(name ?? '');
      })
    );

    this.filteredCategories = this.category.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return this._filterCategories(name ?? '');
      })
    );

    this.filteredEmojis = this.emoji.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return this._filterEmojis(name ?? '');
      })
    );
  }

  get isPristine() {
    return (
      this.emoji.pristine &&
      this.role.pristine &&
      this.category.pristine &&
      this.description.pristine
    );
  }

  get isValid() {
    return this.emoji.valid && this.role.valid;
  }

  private _filterRoles(value: string): IGuildRole[] {
    const filterValue = value?.toLowerCase();

    return this.data.roles.filter((r) =>
      r.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCategories(value: string): ICategory[] {
    const filterValue = value?.toLowerCase();

    return this.data.categories.filter((c) =>
      c.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterEmojis(value: string): IGuildEmoji[] {
    const filterValue = value?.toLowerCase();

    return this.data.emojis.filter((e) =>
      e.name.toLowerCase().includes(filterValue)
    );
  }

  discordEmoji(id: string) {
    return `https://cdn.discordapp.com/emojis/${id}.webp?size=56&quality=lossless`;
  }

  displayFn(value: ICategory | IGuildRole): string {
    return value && value.name ? value.name : '';
  }

  onSubmit() {
    if (!this.isValid) {
      return this.snackbar.open('Invalid form!', 'Dismiss', {
        politeness: 'assertive',
        panelClass: 'app-notification-error',
      });
    }

    const reactRole = {
      emoji: this.emoji.value,
      role: this.role.value,
      category: this.category.value,
      description: this.description.value,
    };

    return this.dialogRef.close(reactRole);
  }
}
