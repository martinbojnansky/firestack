import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './guards/auth.guard';
import {
  ActionService,
  FirebaseActionService,
} from './services/action.service';
import { AuthService, FirebaseAuthService } from './services/auth.service';
import {
  EmulatedFirebaseService,
  FirebaseService,
} from './services/firebase.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {
      provide: FirebaseService,
      useFactory: () =>
        environment.production
          ? new FirebaseService(environment.firebaseConfig)
          : new EmulatedFirebaseService(environment.firebaseConfig),
    },
    {
      provide: AuthService,
      useClass: FirebaseAuthService,
    },
    AuthGuard,
    {
      provide: ActionService,
      useClass: FirebaseActionService,
    },
  ],
  exports: [HttpClientModule],
})
export class CoreModule {}
