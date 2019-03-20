import { createInstance, types } from 'sharetribe-flex-sdk';
import config from '../../config';
import AsyncStore from './AsyncStore';

class SharetribeSdkService {
  init() {
    this.sdk = createInstance({
      clientId: config.MARKETPLACE_ID,
      tokenStore: AsyncStore({ clientId: config.MARKETPLACE_ID }),
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

  login({ email, password }) {
    return this.sdk.login({
      username: email,
      password,
    });
  }

  logout() {
    return this.sdk.logout();
  }

  isAuthenticated() {
    return this.sdk.authInfo();
  }

  getUser() {
    return this.sdk.currentUser.show();
  }

  resetPassword({ email }) {
    return this.sdk.passwordReset.request({ email });
  }

  updatePassword({ email, newPassword, token }) {
    return this.sdk.passwordReset.reset({
      email,
      passwordResetToken: token,
      newPassword,
    });
  }

  createListing({
    title,
    description,
    price,
    category,
    subCategory,
    brand,
    level,
    images,
    location,
  }) {
    return this.sdk.ownListings.create(
      {
        title,
        description,
        price: new types.Money(Number(price), 'USD'),
        publicData: {
          category,
          subCategory,
          brand,
          level,
          location,
        },
        images,
      },
      {
        expand: true,
        include: ['images'],
      },
    );
  }

  imagesUpload(image) {
    return this.sdk.images.upload({
      image,
    });
  }

  getOwnListing(id) {
    return this.sdk.ownListings.show({ id });
  }

  fetchListings(query) {
    return this.sdk.listings.query(query);
  }
}

export default new SharetribeSdkService();
