import { Output, Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import notify from 'devextreme/ui/notify';

@Injectable()
export class UserService {

  constructor(private firestore: AngularFirestore) {

  }
  createUser(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .add(data)
        .then(() => notify('Added', 'success', 500)
    , err => notify(err, 'error', 500));
    });
  }
  getUsers(): Observable<any> {
    return this.firestore.collection('/users').snapshotChanges().pipe(map(users =>
      users.map(r => {
        const data = r.payload.doc.data();
        const id = r.payload.doc.id;
        return {id, ...data};
      })
    ));
  }
  updateUser(data) {
    return this.firestore
      .collection('users')
      .doc(data.id)
      .set(data, { merge: true }).then(() => notify('updated', 'success', 500)).catch(e => notify(e, 'error', 500));
  }
  deleteUser(data) {
    return this.firestore
      .collection('users')
      .doc(data)
      .delete().then(() => notify('Removed', 'success', 500)).catch(e => notify(e, 'error', 500));

  }
}
