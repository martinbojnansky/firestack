import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { FirebaseService } from './firebase.service';

export abstract class AuthService {
  abstract readonly user$: Observable<User | null>;
  abstract readonly token$: Observable<string | null>;

  abstract signIn(): Observable<void>;
  abstract signOut(): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService extends AuthService {
  readonly user$ = new BehaviorSubject<User | null>(null);
  readonly token$ = new BehaviorSubject<string | null>(null);

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
