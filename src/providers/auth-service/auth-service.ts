import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';


@Injectable()
export class AuthServiceProvider {

  constructor(private auth: AngularFireAuth, private data: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }
  async signInWithEmailAndPassword(account: Account) {

    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch(e){
      return <LoginResponse> {
        error: e
      };
    }
    
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await  this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      };
    }
    catch(e){
      return <LoginResponse> {
        error: e
      };

    }
  }

  getAutenticatedUser() {
    //this.data.database.goOnline();
    console.log(this.auth.authState);

    return this.auth.authState;
  }

  signOut() { 
    this.auth.auth.signOut();
  }

}
