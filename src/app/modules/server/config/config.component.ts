import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { GuildReactType, IGuildConfig } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  config?: IGuildConfig;
  configForm: FormGroup;

  types: { label: string; value: GuildReactType }[] = [
    { label: 'Reaction', value: 0 },
    { label: 'Button', value: 1 },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar
  ) {
    this.configForm = this.fb.group({
      reactType: new FormControl(GuildReactType.reaction),
      hideEmojis: new FormControl(false),
    });

    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params) => {
          const guildId = params['guildId'];

          if (!guildId) return of(null);

          return this.apiService.getGuildConfig(guildId);
        })
      )
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

    this.configForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const hideEmojis = this.configForm.get('hideEmojis');
        if (this.isReaction && !hideEmojis?.disabled) hideEmojis?.disable();
        else if (this.isButton && hideEmojis?.disabled) hideEmojis.enable();
      });
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
    };

    console.log(this.config);

    if (!this.config || this.configForm.invalid) {
      return this.snackbar.open('Invalid form!', 'Dismiss', {
        panelClass: 'app-notification-error',
      });
    }

    return this.apiService
      .updateConfig(this.config?.guildId, updatedConfig)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((config) => {
        this.snackbar.open(`Successfully updated config!`, 'Ok', {
          panelClass: 'app-notification-success',
        });

        this.configForm.markAsPristine();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
