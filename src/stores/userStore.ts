import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  doc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import customToast from '../Components/Notification/customToast';

export interface IGetUser {
  id: string;
}

export interface IUserPermissions {
  editable: string;
  user_id: string;
}

class UserInfo {
  userInfo = {};
  userPermissions: DocumentData = {};
  isLoadingUserInfo = false;
  isLoadingUpdateUserInfo = false;
  isLoadingUserPermissions = false;

  constructor() {
    makeObservable(this, {
      userInfo: observable.ref,
      userPermissions: observable.ref,
      isLoadingUserInfo: observable.ref,
      isLoadingUpdateUserInfo: observable.ref,
      isLoadingUserPermissions: observable.ref,

      getUserInfo: action,
      updateUserInfo: action,
      getUserPermission: action,
    });
  }

  // NOTE: receive info about user
  getUserInfo = async ({ id }: IGetUser) => {
    runInAction(() => {
      this.isLoadingUserInfo = true;
    });

    try {
      const userDocRef = doc(db, 'users', id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        runInAction(() => {
          this.userInfo = userDoc.data();
          this.isLoadingUserInfo = false;
        });
      } else {
        this.isLoadingUserInfo = false;
        customToast({ name: 'No such document!', type: 'warning' });
      }
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserInfo = false;
        customToast({ name: 'Fetch info failed', type: 'error' });
      });
    }
  };

  // NOTE: Via this request we will update the status
  updateUserInfo = async ({
    editable,
    userId,
  }: {
    editable: boolean;
    userId: string;
  }) => {
    runInAction(() => {
      this.isLoadingUpdateUserInfo = true;
    });

    try {
      const tasksRef = doc(db, 'users', userId);

      await updateDoc(tasksRef, {
        editable: editable,
      });

      runInAction(() => {
        this.isLoadingUpdateUserInfo = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingUpdateUserInfo = false;
      });
      customToast({ name: 'Error in update info', type: 'error' });
    }
  };

  getUserPermission = async ({ userId }: { userId: string }) => {
    runInAction(() => {
      this.isLoadingUserPermissions = true;
    });

    try {
      const permissionQuery = query(
        collection(db, 'permissions'),
        where('user_id', '==', userId)
      );

      const permissionSnapshot = await getDocs(permissionQuery);

      if (!permissionSnapshot.empty) {
        const permissions = permissionSnapshot.docs[0].data();
        runInAction(() => {
          this.isLoadingUserPermissions = false;
          this.userPermissions = permissions;
        });
        customToast({ name: 'Permissions received', type: 'success' });
      } else {
        runInAction(() => {
          this.isLoadingUserPermissions = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserPermissions = false;
      });
      customToast({ name: 'Can not fetch permissions', type: 'error' });
    }
  };
}

export default new UserInfo();
