import { createInstance } from 'sharetribe-flex-sdk';

class SharetribeSdkService {
  constructor() {
    this.sdk = createInstance({
      clientId: '2a96a108-d05c-47fd-af0c-631343eb41cd',
    });
  }

  register({ firstName, lastName, email, password }) {
    return this.sdk.currentUser.create({
      firstName,
      lastName,
      email,
      password,
    });
  }
}

export default new SharetribeSdkService();
