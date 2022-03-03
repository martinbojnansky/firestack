import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActionService } from './services/action.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [ActionService],
  exports: [HttpClientModule],
})
export class CoreModule {}
