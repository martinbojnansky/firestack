import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Nullable, ObservableUnsubscriber } from 'ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive()
// eslint-disable-next-line
export abstract class FormComponent<T> implements OnInit, OnDestroy {
  readonly value$ = new BehaviorSubject<Nullable<T>>(undefined);

  @Input()
  set value(v: Nullable<T>) {
    this.value$.next(v);
  }

  readonly editable$ = new BehaviorSubject<Nullable<boolean>>(false);

  @Input()
  set editable(v: Nullable<boolean>) {
    this.editable$.next(v);
  }

  @Output()
  readonly saved = new EventEmitter<T>();

  @Output()
  readonly reseted = new EventEmitter<void>();

  abstract form: FormGroup;

  protected unsubscriber = new ObservableUnsubscriber();

  constructor() {}

  ngOnInit(): void {
    this.value$
      .pipe(
        this.unsubscriber.onDestroy(),
        tap((r) => {
          this.form.reset(r, { emitEvent: true });
        }),
      )
      .subscribe();
    this.editable$
      ?.pipe(
        this.unsubscriber.onDestroy(),
        tap((editable) =>
          editable
            ? this.form.enable({ emitEvent: false })
            : this.form.disable({ emitEvent: false }),
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }

  save(): void {
    this.form.valid
      ? this.saved.emit(this.form.getRawValue())
      : this.form.markAllAsTouched();
  }

  reset(confirmation: boolean = true): void {
    const runReset = () => {
      this.form.reset(this.value$.value, { emitEvent: false });
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.reseted.emit();
    };

    if (!confirmation) {
      runReset();
    } else if (confirm('Do you really want to reset the form value?')) {
      runReset();
    }
  }
}
