import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';

@NgModule({
  declarations: [],
  imports: [
    AppModule,
    HttpClientTestingModule,
    RouterTestingModule.withRoutes([]),
    NoopAnimationsModule,
  ],
  providers: [],
})
export class AppTestingModule {}
