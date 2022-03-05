import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './views/home-view/home-view.component';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [CommonModule, HomeRoutingModule, LayoutModule],
})
export class HomeModule {}
