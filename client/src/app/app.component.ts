import { Component } from '@angular/core';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private firebaseService: FirebaseService) {}
}
