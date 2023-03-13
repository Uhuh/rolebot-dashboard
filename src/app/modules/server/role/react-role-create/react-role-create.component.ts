import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ICategory,
  IGuildEmoji,
  IGuildRole,
  IReactRole,
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
export class ReactRoleCreateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
    private readonly dialogRef: MatDialogRef<ReactRoleCreateComponent>
  ) {}

  createReactRole(reactRole: IReactRole) {
    this.dialogRef.close(reactRole);
  }
}
