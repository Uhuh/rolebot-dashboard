import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { GuildReactType, IGuildConfig } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';
import { LoadState } from '../state/loading-state';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  readonly LoadState = LoadState;
  errorMessage = '';

  loadState: LoadState = LoadState.Loading;
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

    this.guildService.config$.pipe(takeUntil(this.destroyed)).subscribe({
      next: (guildConfig) => {
        if (!guildConfig) {
          this.loadState = LoadState.Error;
          this.errorMessage = 'Uhoh! We failed to find your servers config.';
          return console.error(`Guild config missing.`);
        }

        this.config = guildConfig.config;

        this.configForm.patchValue({
          reactType: guildConfig.config.reactType,
          hideEmojis: guildConfig.config.hideEmojis,
        });

        this.loadState = guildConfig.loadState;
        this.configForm.markAsPristine();
      },
      error: () => {
        this.loadState = LoadState.Error;
      },
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

    this.loadState = LoadState.Loading;

    return this.guildService.updateConfig(updatedConfig);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
