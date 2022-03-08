import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsListViewComponent } from './views/logs-list-view/logs-list-view.component';

const routes: Routes = [{ path: '', component: LogsListViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsRoutingModule {}
