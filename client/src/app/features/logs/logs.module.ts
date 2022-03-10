import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { LogComponent } from './components/log/log.component';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsListViewComponent } from './views/logs-list-view/logs-list-view.component';

@NgModule({
  declarations: [LogsListViewComponent, LogComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    LayoutModule,
    MatListModule,
    MatCardModule,
    FormsModule,
  ],
})
export class LogsModule {}
