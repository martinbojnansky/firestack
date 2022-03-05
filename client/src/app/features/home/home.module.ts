import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './views/home-view/home-view.component';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [CommonModule, HomeRoutingModule, LayoutModule, MatButtonModule],
})
export class HomeModule {}
