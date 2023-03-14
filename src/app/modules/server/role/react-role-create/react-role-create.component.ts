import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ICategory,
  IGuildEmoji,
  IGuildRole,
} from 'src/app/shared/types/interfaces';

export interface DialogData {
  categories: ICategory[];
  roles: IGuildRole[];
  customEmojis: IGuildEmoji[];
}

@Component({
  selector: 'app-react-role-create',
  templateUrl: './react-role-create.component.html',
  styleUrls: ['./react-role-create.component.scss'],
})
export class ReactRoleCreateComponent implements OnChanges {
  roleId = new FormControl('', [Validators.required]);
  emoji = new FormControl('', [Validators.required]);
  categoryId = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData,
    private readonly dialogRef: MatDialogRef<ReactRoleCreateComponent>,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnChanges(): void {}

  get isPristine() {
    return this.emoji.pristine && this.roleId.pristine;
  }

  get isValid() {
    return this.emoji.valid && this.roleId.valid;
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
      roleId: this.roleId.value,
    };

    return this.dialogRef.close(reactRole);
  }
}
