import { Output, Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import notify from 'devextreme/ui/notify';

@Injectable()
export class RoleService {

  constructor(private firestore: AngularFirestore) {

  }
  createRole(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('roles-new')
        .doc(data.id)
        .set(data)
        .then(() => notify('Added', 'success', 500)
    , err => notify(err, 'error', 500));
    });
  }

  getRoles(): Observable<any> {
    return this.firestore.collection('/roles-new').snapshotChanges().pipe(map(roles =>
      roles.map(r => {
        const data = r.payload.doc.data();
        const id = r.payload.doc.id;
        return {id, ...data};
      })
    ));
  }
  getRolePermission(id, permission) {
     return this.firestore.collection('/roles-new').doc(id).ref.get().then(data => {
      const role =  data.data();
      return role.priviliages.findIndex(permission) !== -1;
    });
  }
  updateRole(data) {
    return this.firestore
      .collection('roles-new')
      .doc(data.id)
      .set(data, { merge: true }).then(() => notify('updated', 'success', 500)).catch(e => notify(e, 'error', 500));
  }

  deleteRole(data) {
    return this.firestore
      .collection('roles-new')
      .doc(data)
      .delete().then(() => notify('Removed', 'success', 500)).catch(e => notify(e, 'error', 500));

  }
}
