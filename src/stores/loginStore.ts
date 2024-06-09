import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { auth, db } from '../firebase/firebase';
import { privatePaths, publicPaths } from '../configs/routes';
import customToast from '../Components/Notification/customToast';

interface ICredentials {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

interface ILogout {
  navigate: NavigateFunction;
}

export interface IUser {
  email: string;
  docId: string;
  userId: string;
}

class AuthUser {
  user: Partial<IUser> = {
    email: '',
    docId: '',
    userId: '',
  };
  isLoadingUserAuth = false;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      isLoadingUserAuth: observable.ref,

      userSignup: action,
      userLogin: action,
      logout: action,
      setUser: action,
    });

    this.loadUserFromLocalStorage();
  }

  setUser = (user: { email: string; docId: string; userId: string }) => {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  };

  loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  };

  userSignup = async ({ email, password, navigate }: ICredentials) => {
    runInAction(() => {
      this.user = {};
      this.isLoadingUserAuth = true;
    });

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredentials;

      // Get users collection from db
      const usersRef = collection(db, 'users');
      const permissionsRef = collection(db, 'permissions');

      // add new field to certain user
      const docRef = await addDoc(usersRef, {
        id: user.uid,
        email: user.email,
        editable: 'TODO',
      });

      await addDoc(permissionsRef, {
        editable: 'TODO',
        user_id: user.uid,
      });

      runInAction(() => {
        localStorage.setItem(
          'access_token',
          JSON.stringify(user?.getIdToken())
        );
        this.setUser({
          email: user?.email as string,
          docId: docRef.id,
          userId: user.uid,
        });
        this.isLoadingUserAuth = false;
        customToast({ name: 'Sign Up!', type: 'success' });
        navigate(privatePaths.todoList, { replace: true });
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserAuth = false;
        customToast({ name: 'Error occur when user sign up', type: 'error' });
      });
    }
  };

  userLogin = async ({ email, password, navigate }: ICredentials) => {
    runInAction(() => {
      this.isLoadingUserAuth = true;
      this.user = {};
    });

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredentials;

      // get users collections and filtering by email
      const queryToUsers = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      // get data related to user
      const querySnapshot = await getDocs(queryToUsers);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        runInAction(() => {
          this.isLoadingUserAuth = false;
          localStorage.setItem(
            'access_token',
            JSON.stringify(user?.getIdToken())
          );

          this.setUser({
            email: user?.email as string,
            docId: querySnapshot.docs[0].id,
            userId: userData.id,
          });
          navigate(privatePaths.todoList, { replace: true });
        });
        customToast({ name: 'Loged in!', type: 'success' });
      }
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserAuth = false;
        customToast({ name: 'Error occur when login', type: 'error' });
      });
    }
  };

  logout = ({ navigate }: ILogout) => {
    localStorage.clear();
    navigate && navigate(publicPaths.login, { replace: true });
  };
}

export default new AuthUser();
