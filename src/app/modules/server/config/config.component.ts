import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { GuildReactType, IGuildConfig } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  guildId?: string;
  config?: IGuildConfig;
  configForm: FormGroup;

  types: { label: string; value: GuildReactType }[] = [
    { label: 'Reaction', value: 0 },
    { label: 'Button', value: 1 },
  ];

  constructor(
    private readonly guildService: GuildService,
    private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar
  ) {
    this.configForm = this.fb.group({
      reactType: new FormControl(GuildReactType.reaction),
      hideEmojis: new FormControl(false),
    });

    this.guildService.config$
      .pipe(takeUntil(this.destroyed))
      .subscribe((config) => {
        if (!config) {
          return console.error(`Guild config missing.`);
        }

        this.config = config;

        this.configForm.patchValue({
          reactType: config.reactType,
          hideEmojis: config.hideEmojis,
        });
      });

    this.guildService.guildId$
      .pipe(takeUntil(this.destroyed))
      .subscribe((guildId) => (this.guildId = guildId));
  }

  get isPristine() {
    return this.configForm.pristine;
  }

  disableEmojis() {}

  get hideEmojis() {
    return this.configForm.get('hideEmojis')?.value;
  }

  get reactType() {
    return this.configForm.get('reactType')?.value;
  }

  get isReaction() {
    return this.reactType === GuildReactType.reaction;
  }

  get isButton() {
    return this.reactType === GuildReactType.button;
  }

  onSubmit() {
    const updatedConfig = {
      ...this.config,
      ...this.configForm.value,
      guildId: this.guildId,
    };

    if (!this.config || this.configForm.invalid) {
      return this.snackbar.open('Invalid form!', 'Dismiss', {
        panelClass: 'app-notification-error',
      });
    }

    return this.guildService.updateConfig(updatedConfig).add(() => {
      this.configForm.markAsPristine();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
