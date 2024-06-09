import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  where,
  query,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';

import customToast from '../Components/Notification/customToast';

import { db } from '../firebase/firebase';

interface ITask {
  completed: boolean;
  name: string;
  userId: string;
}

class Tasks {
  tasks: DocumentData[] = [];
  isLoadingTasks = false;
  isLoadingUserTasks = false;
  isLoadingUserDeleteTasks = false;
  isLoadingUserUpdateTasks = false;

  constructor() {
    makeObservable(this, {
      tasks: observable.ref,
      isLoadingTasks: observable.ref,
      isLoadingUserTasks: observable.ref,
      isLoadingUserDeleteTasks: observable.ref,
      isLoadingUserUpdateTasks: observable.ref,

      getUserTasks: action,
      createTask: action,
      updateTask: action,
      deleteTask: action,
    });
  }

  getUserTasks = async ({ userId }: { userId: string }) => {
    runInAction(() => {
      this.isLoadingUserTasks = true;
      this.tasks = [];
    });
    try {
      const todosQuery = query(
        collection(db, 'todos'),
        where('user_id', '==', userId)
      );

      const querySnapshot = await getDocs(todosQuery);
      if (!querySnapshot.empty) {
        const allUserDocs = querySnapshot.docs;
        const allUserTasks = allUserDocs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        runInAction(() => {
          this.tasks = allUserTasks;
          this.isLoadingUserTasks = false;
        });
      } else {
        runInAction(() => {
          this.isLoadingUserTasks = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserTasks = false;
        customToast({ name: 'Tasks fetch error', type: 'error' });
      });
    }
  };

  createTask = async ({ completed, name, userId }: ITask) => {
    runInAction(() => {
      this.isLoadingTasks = true;
    });

    try {
      await addDoc(collection(db, 'todos'), {
        completed: completed,
        name: name,
        user_id: userId,
      });
      runInAction(() => {
        this.isLoadingTasks = false;
      });
      customToast({ name: 'Task created', type: 'success' });
    } catch (error) {
      runInAction(() => {
        this.isLoadingTasks = false;
        customToast({ name: 'Error in create task', type: 'error' });
      });
    }
  };

  updateTask = async ({
    completed,
    id,
  }: {
    id: string;
    completed: boolean;
  }) => {
    runInAction(() => {
      this.isLoadingUserUpdateTasks = true;
    });

    try {
      const tasksRef = doc(db, 'todos', id);

      await updateDoc(tasksRef, {
        completed: completed,
      });

      runInAction(() => {
        this.isLoadingUserUpdateTasks = false;
      });
      customToast({ name: 'Task updated', type: 'success' });
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserUpdateTasks = false;
      });
      customToast({ name: 'Failed to update task', type: 'error' });
    }
  };

  deleteTask = async ({ id }: { id: string }) => {
    runInAction(() => {
      this.isLoadingUserDeleteTasks = true;
    });

    try {
      await deleteDoc(doc(db, 'todos', id));

      runInAction(() => {
        this.isLoadingUserDeleteTasks = false;
      });
      customToast({ name: 'Task deleted', type: 'success' });
    } catch (error) {
      runInAction(() => {
        this.isLoadingUserDeleteTasks = false;
      });
      customToast({ name: 'Error to delete dask', type: 'error' });
    }
  };
}

export default new Tasks();
