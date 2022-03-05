import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Nullable } from 'ng-toolkit-lib';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input()
  busy: Nullable<boolean>;

  constructor(public authService: AuthService) {}
}
