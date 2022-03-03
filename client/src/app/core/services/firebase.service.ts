import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

export class FirebaseService {
  readonly app: FirebaseApp;
  readonly auth: Auth;
  readonly functions;
  readonly analytics: Analytics;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.functions = getFunctions(this.app);
    this.analytics = getAnalytics(this.app);
  }
}

export class EmulatedFirebaseService extends FirebaseService {
  constructor(config: FirebaseOptions) {
    super(config);
    connectAuthEmulator(this.auth, 'http://localhost:4204');
    connectFunctionsEmulator(this.functions, 'localhost', 4202);
  }
}
