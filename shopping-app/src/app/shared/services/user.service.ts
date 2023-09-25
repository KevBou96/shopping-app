import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { User, IUser } from "src/app/auth/user.model";

@Injectable({providedIn: 'root'})
export class UserService {


    constructor(private afs: AngularFirestore) {}

    addUserToDatabase(user: IUser) {
        this.afs.collection('users').doc(user.id)
        .set({
            name: user.name,
            lastname: user.lastName,
            email: user.email,
            id: user.id,
            verified: user.emailVerified,
        })
    }

    verifyUser(id: string) {
        this.afs.collection('users').doc(id)
        .update({
            verified: true
        })
    }
}