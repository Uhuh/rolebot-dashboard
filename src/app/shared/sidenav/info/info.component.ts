import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { JwtService } from '../../services/jwtHandler.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  isFresh?: boolean;

  constructor(private readonly jwtService: JwtService) {
    this.jwtService.isFresh$
      .pipe(takeUntil(this.destroyed))
      .subscribe((isFresh) => (this.isFresh = isFresh));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
