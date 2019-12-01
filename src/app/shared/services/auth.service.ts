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
  loggedIn = false;

  user: User;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    // this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       this.loggedIn = true;
    //       this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(res=>{
    //         console.log(res);
    //         this.user = res;
    //       });
    //     } else {
    //       this.loggedIn = false;
    //       return of(null);
    //     }
    //   })
    // );

  }


  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: 'salesman'
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

  gettingUserChange(user) {
          this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(res => {
            this.loggedIn = true;
            this.user = res;
            this.router.navigate(['/']);
          });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user);
        this.gettingUserChange(result.user);
        notify('SingedUp', 'success', 500);
      })
      .catch(error => notify(error, 'error', 500));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.gettingUserChange(result.user);
        notify('Logged in', 'success', 500);
      }).catch((error) => {
        notify(error, 'error', 500);
      });
  }


}
