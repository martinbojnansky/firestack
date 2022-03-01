import { Component } from '@angular/core';
import { from } from 'rxjs';
import { ActionService } from './action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firestack';

  constructor(private actionService: ActionService) {}

  readonly all$ = from(this.actionService.invoke('getAll')('a_b_c'));
  readonly one$ = from(this.actionService.invoke('getOne')('a'));
}
