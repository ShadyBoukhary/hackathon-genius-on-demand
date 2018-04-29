import { Injectable, OnDestroy } from '@angular/core';
//import { AngularFireDatabase/*, AngularFireObject*/} from 'angularfire2/database';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User, database } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { AuthServiceProvider } from '../auth-service/auth-service';


import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import 'rxjs/add/operator/first';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { first } from 'rxjs/operator/first';
import { Question } from '../../models/question/question.interface';
import { TutorResquest } from '../../models/tutor-request/tutor-request.interface';



@Injectable()
export class DataService implements OnDestroy {

  /*profileObject: AngularFireObject<Profile>*/
  profileObject: FirebaseObjectObservable<Profile>;
  profileList: FirebaseListObservable<Profile>;
  questionObject: FirebaseObjectObservable<Question>;
  questionList: FirebaseListObservable<Question[]>;

  sub: Subscription;


  constructor(private auth: AuthServiceProvider, private database: AngularFireDatabase) {
  }


  // returns an authenticated user profile by merging 2 observables
  getAuthenticatedUserProfile() {
    return this.auth.getAutenticatedUser()
      .map(user => user.uid)  // get authenticated user ID
      // merge the previous observable with the profile observable of the
      // user with that ID
      .mergeMap(authId => this.database.object(`profiles/${authId}`))
      // complete the observable cycle
      .take(1);
  }


  getProfile(user: User) {
    /* preservesnapshot prevents database from unwrapping data */
    this.profileObject = this.database.object(`/profiles/${user.uid}`, { preserveSnapshot: true });
    console.log('Returning Profile');
    return this.profileObject.take(1);
  }

  /* authenticated user and current profile */
  async saveProfile(user: User, profile: Profile) {
    // get the user profile as an observable /profiles/ etc.. is the structure inside FireBase
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {
      /*  try to set the profileObject in the database
       returns a promise ==> need async/await */
      await this.profileObject.set(profile);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  async saveQuestion(question: Question): Promise<boolean> {
    try {
      await this.database.list(`/questions/`).push(question);
      return true;
    }
    catch(error) {
      console.log(error);
      return false;
    }
  }

  getQuestions(): FirebaseListObservable<Question[]> {
    return this.database.list(`/questions/`);
  }

  getQuestionByID(question: Question) {
    return this.database.object(`/questions/${question.$key}`);
  }

  async deleteQuestion(question: Question) {
    const questionObject: FirebaseObjectObservable<Question> = this.database.object(`/questions/${question.$key}`);
    try {
      await questionObject.remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveRequest(request: TutorResquest): Promise<boolean> {
    try {
      await this.database.list(`/requests/`).push(request);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveAnswer(question: Question): Promise<boolean> {
    const questionObject: FirebaseObjectObservable<Question> = this.database.object(`/questions/${question.$key}`);
    try {
      await questionObject.set(question);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  getRequests(): FirebaseListObservable<TutorResquest[]> {
    return this.database.list(`/requests/`);
  }
  
  async deleteRequest(request: TutorResquest) {
    const requestObject: FirebaseObjectObservable<TutorResquest> = this.database.object(`/requests/${request.$key}`);
    try {
      await requestObject.remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.$key}`);
    try {
      ref.update({ ...profile});
      ref.onDisconnect().remove();
    }
    catch(error) {
      console.log(error);
    }
  }
  getOnlineUsers(): FirebaseListObservable<Profile[]> {
    return this.database.list('online-users');
  }
  
}


