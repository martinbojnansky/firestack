import { NgModule } from '@angular/core';
import { AppTestingModule } from 'src/app/app.testing-module';
import { HomeModule } from './home.module';

@NgModule({
  declarations: [],
  imports: [HomeModule, AppTestingModule],
})
export class HomeTestingModule {}
