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
    return this.sdk.currentUser.show({
      include: ['profileImage'],
    });
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
    geolocation,
  }) {
    return this.sdk.ownListings.create(
      {
        title,
        description,
        price: new types.Money(Number(price), 'USD'),
        geolocation: new types.LatLng(
          geolocation.lat,
          geolocation.lng,
        ),
        publicData: {
          category,
          subCategory,
          brand,
          level,
          location,
          title,
          description,
          price: Number(price),
        },
        images,
      },
      {
        expand: true,
        include: ['marketplace', 'images', 'author'],
      },
    );
  }

  imagesUpload(image) {
    return this.sdk.images.upload({
      image,
    });
  }

  updateProfile(query) {
    return this.sdk.currentUser.updateProfile(query, {
      include: ['profileImage'],
    });
  }

  updateAvatar(avatarId) {
    const profileImageId = new types.UUID(avatarId);
    return this.sdk.currentUser.updateProfile({
      profileImageId,
    });
  }

  getOwnListing(id) {
    return this.sdk.ownListings.show({ id });
  }

  fetchListings(query) {
    return this.sdk.listings.query(query);
  }

  fetchOwnListings(query) {
    return this.sdk.ownListings.query(query);
  }

  getUserById(userId) {
    const id = new types.UUID(userId);
    return this.sdk.users.show({ id });
  }

  changePassword({ currentPassword, newPassword }) {
    return this.sdk.currentUser.changePassword({
      currentPassword,
      newPassword,
    });
  }

  changeEmail({ currentPassword, email }) {
    return this.sdk.currentUser.changeEmail({
      currentPassword,
      email,
    });
  }

  sendVerifyEmail() {
    return this.sdk.currentUser.sendVerificationEmail();
  }

  verifyEmail(verificationToken) {
    return this.sdk.currentUser.verifyEmail({
      verificationToken,
    });
  }

  updateOwnListings({
    id,
    title,
    description,
    price,
    category,
    subCategory,
    brand,
    level,
    images,
    location,
    geolocation,
  }) {
    const params = {
      id: new types.UUID(id),
      title,
      description,
      price: new types.Money(Number(price), 'USD'),
      geolocation: new types.LatLng(geolocation.lat, geolocation.lng),
      publicData: {
        category,
        subCategory,
        brand,
        level,
        location,
        title,
        description,
        price: Number(price),
      },
      images: images.map((i) => new types.UUID(i)),
    };
    return this.sdk.ownListings.update(params, {
      expand: true,
      include: ['images', 'author'],
    });
  }
}

export default new SharetribeSdkService();
