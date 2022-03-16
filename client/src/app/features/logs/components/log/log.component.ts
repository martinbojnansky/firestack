import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Log, logSchema } from '@api/models';
import { nameof } from 'ng-toolkit-lib';
import { FormComponent } from 'src/app/shared/forms/components/form.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent extends FormComponent<Log> {
  readonly schema = logSchema;

  readonly eventControl = new FormControl(null, {
    validators: [this.zvalidator(this.schema.shape.event)],
  });

  readonly descriptionControl = new FormControl(null, {
    validators: [this.zvalidator(this.schema.shape.description)],
  });

  readonly form: FormGroup = new FormGroup({
    [nameof<Log>('event')]: this.eventControl,
    [nameof<Log>('description')]: this.descriptionControl,
  });
}