import { NgModule } from '@angular/core';
import { AppTestingModule } from 'src/app/app.testing-module';
import { LogsModule } from './logs.module';

@NgModule({
  declarations: [],
  imports: [LogsModule, AppTestingModule],
})
export class LogsTestingModule {}
