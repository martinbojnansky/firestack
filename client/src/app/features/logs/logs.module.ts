import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsListViewComponent } from './views/logs-list-view/logs-list-view.component';

@NgModule({
  declarations: [LogsListViewComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class LogsModule {}
