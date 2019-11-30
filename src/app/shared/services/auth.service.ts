import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from '../entities/user';
import notify from 'devextreme/ui/notify';

@Injectable()
export class AuthService {
  loggedIn = true;

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }


  private updateUserData(user, isNew) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: isNew ? 'salesman' : user.role
    };
    return userRef.set(data, {merge: true});
  }


  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login-form']);
      this.loggedIn = false;
    });
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
  get userExists() {
    return this.user || null;
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user, true);
        this.loggedIn = true;
        this.router.navigate(['/']);
      })
      .catch(error => notify(error, 'error', 500));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user, false);
        this.loggedIn = true;
        this.router.navigate(['/']);
      }).catch((error) => {
        notify(error, 'error', 500);
      });
  }


}
