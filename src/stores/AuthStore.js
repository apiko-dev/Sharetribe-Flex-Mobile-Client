import { types } from 'mobx-state-tree';

export const User = types.model({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
}).actions(store => ({
  editUser: ({
    id, firstName, lastName, email,
  }) => {
    store.id = id;
    store.firstName = firstName;
    store.lastName = lastName;
    store.email = email;
  },
}));

export const AuthStore = types.model({
  isAuthenticated: false,
  isSigningIn: false,
  isSigningUp: false,
  user: types.optional(User, {}),
}).actions(store => ({
  singIn: ({
    id, firstName, lastName, email,
  }) => {
    store.user = {
      id,
      firstName,
      lastName,
      email,
    };

    store.isAuthenticated = true;
  },

  addUser: ({
    id, firstName, lastName, email,
  }) => {
    store.user = {
      id,
      firstName,
      lastName,
      email,
    };
  },

  removeUser: () => {
    store.user = {};
  },

}));

export default AuthStore;