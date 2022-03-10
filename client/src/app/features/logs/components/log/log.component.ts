import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Log } from '@api/models';
import { nameof } from 'ng-toolkit-lib';
import { FormComponent } from 'src/app/shared/forms/components/form.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent extends FormComponent<Log> {
  readonly eventControl = new FormControl(null, {
    validators: [Validators.required, Validators.minLength(3)],
  });

  readonly descriptionControl = new FormControl(null);

  readonly form: FormGroup = new FormGroup({
    [nameof<Log>('event')]: this.eventControl,
    [nameof<Log>('description')]: this.descriptionControl,
  });
}
