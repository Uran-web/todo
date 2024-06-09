export interface IPrivatePaths {
  todoList: '/todos/list';
}

export interface IPublicPaths {
  login: string;
  signup: string;
}

export const privatePaths: IPrivatePaths = {
  todoList: '/todos/list',
};

export const publicPaths: IPublicPaths = {
  login: '/login',
  signup: '/signup',
};
