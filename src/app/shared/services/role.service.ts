import { Output, Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class RoleService {
  @Output() changed = new EventEmitter();

  constructor(private firestore: AngularFirestore) {

  }
  createRole(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('roles-new')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }
  getRoles() {
    return this.firestore.collection('roles-new').snapshotChanges();
  }
  updateRole(data) {
    return this.firestore
      .collection('roles-new')
      .doc(data)
      .set({ completed: true }, { merge: true });
  }
  deleteRole(data) {
    return this.firestore
      .collection('roles-new')
      .doc(data)
      .delete();
  }
}
