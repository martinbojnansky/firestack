import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from 'firebase/auth';
import { Nullable } from 'ng-toolkit-lib';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input()
  user: Nullable<User>;

  @Output()
  readonly signIn = new EventEmitter<void>();

  @Output()
  readonly signOut = new EventEmitter<void>();

  constructor() {}
}
