import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '../../shared/layout/layout.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './views/home-view/home-view.component';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
  ],
})
export class HomeModule {}
