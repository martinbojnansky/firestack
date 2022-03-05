import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth';
import { Nullable } from 'ng-toolkit-lib';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { FirebaseService } from './firebase.service';

export abstract class AuthService {
  abstract readonly user$: Observable<Nullable<User>>;
  abstract readonly token$: Observable<Nullable<string>>;

  abstract signIn(): Observable<void>;
  abstract signOut(): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService extends AuthService {
  readonly user$ = new BehaviorSubject<Nullable<User>>(undefined);
  readonly token$ = new BehaviorSubject<Nullable<string>>(undefined);

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) {
    super();
    this.firebaseService.auth.onAuthStateChanged((user) => {
      this.user$.next(user);
      this.token$.next(null);
      user?.getIdToken().then((token) => {
        this.token$.next(token);
      });
    });
  }

  signIn(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithRedirect(this.firebaseService.auth, provider));
  }

  signOut(): Observable<void> {
    return from(this.firebaseService.auth.signOut()).pipe(
      tap(() => this.router.navigate(['/'])),
    );
  }
}
