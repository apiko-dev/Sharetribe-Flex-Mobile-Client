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

  register({ firstName, lastName, email, password, displayName }) {
    return this.sdk.currentUser.create({
      firstName,
      lastName,
      email,
      password,
      displayName,
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
    entriesDay,
    availabilityPlanType,
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
        availabilityPlan: {
          type: availabilityPlanType,
          entries: entriesDay,
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

  getOwnListing({ id, include }) {
    return this.sdk.ownListings.show({ id, include });
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
    entriesDay,
    availabilityPlanType,
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
      availabilityPlan: {
        type: availabilityPlanType,
        entries: entriesDay,
      },
      images: images.map((i) => new types.UUID(i)),
    };
    return this.sdk.ownListings.update(params, {
      expand: true,
      include: ['images', 'author'],
    });
  }

  getAvailableDays({ listingId, start, end }) {
    return this.sdk.timeslots.query({
      listingId: new types.UUID(listingId),
      start: new Date(start),
      end: new Date(end),
    });
  }

  initiateTransaction({ listingId, startRent, endRent, cardToken }) {
    return this.sdk.transactions.initiate(
      {
        processAlias: 'preauth-with-nightly-booking/release-1',
        transition: 'transition/request',
        params: {
          listingId,
          bookingStart: new Date(startRent),
          bookingEnd: new Date(endRent),
          cardToken,
        },
      },
      {
        expand: true,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
          // 'reviews',
          // 'reviews.author',
          // 'reviews.subject',
        ],
      },
    );
  }

  initiateMessageTransaction(listId) {
    console.log('run service... ');
    return this.sdk.transactions.initiate(
      {
        processAlias: 'preauth-with-nightly-booking/release-1',
        transition: 'transition/enquire',
        params: {
          listingId: new types.UUID(listId),
        },
      },
      {
        expand: true,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'listing.images',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
      },
    );
  }

  fetchMessage({ transactionId, perPage, page }) {
    console.log('run service... ');
    return this.sdk.messages.query({
      transactionId: new types.UUID(transactionId),
      include: ['sender', 'sender.profileImage'],
      perPage,
      page,
    });
  }

  fetchMoreMessage({ transactionId, perPage, page }) {
    console.log('run service... ');
    return this.sdk.messages.query({
      transactionId: new types.UUID(transactionId),
      include: ['sender', 'sender.profileImage'],
      perPage,
      page,
    });
  }

  sendMessage({ transactionId, content }) {
    console.log('run service... ');
    return this.sdk.messages.send(
      {
        transactionId: new types.UUID(transactionId),
        content,
      },
      {
        expand: true,
      },
    );
  }

  fetchTransactions(params) {
    return this.sdk.transactions.query({
      include: [
        'customer',
        'customer.profileImage',
        'provider',
        'provider.profileImage',
        'listing',
        'listing.images',
        'booking',
        'reviews',
        'reviews.author',
        'reviews.subject',
      ],
      ...params,
    });
  }

  transactionsQuery() {
    return this.sdk.transactions.query({
      // only: 'order',
      // lastTransitions: ['transition/request'],
      include: [
        // 'customer',
        // 'customer.profileImage',
        // 'provider',
        // 'provider.profileImage',
        'listing',
        // 'booking',
        // 'reviews',
        // 'reviews.author',
        // 'reviews.subject',
      ],
    });
  }

  transactionsShow({ transactionId }) {
    return this.sdk.transactions.show({
      id: new types.UUID(transactionId),
      include: [
        'customer',
        'customer.profileImage',
        'provider',
        'provider.profileImage',
        'listing',
        // 'booking',
        'reviews',
        'reviews.author',
        'reviews.subject',
        'messages',
      ],
    });
  }

  changeStateTransactions({ transactionId, transition }) {
    return this.sdk.transactions.transition(
      {
        id: new types.UUID(transactionId),
        transition,
        params: {},
      },
      {
        expand: true,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          // 'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
          'messages',
        ],
      },
    );
  }

  changeTransactionsAfterEnquiry({
    transactionId,
    transition,
    listingId,
    startRent,
    endRent,
    cardToken,
  }) {
    return this.sdk.transactions.transition(
      {
        id: transactionId,
        transition,
        params: {
          listingId,
          bookingStart: new Date(startRent),
          bookingEnd: new Date(endRent),
          cardToken,
        },
      },
      {
        expand: true,
        include: [
          // 'customer',
          // 'customer.profileImage',
          // 'provider',
          // 'provider.profileImage',
          'listing',
          'booking',
          // 'reviews',
          // 'reviews.author',
          // 'reviews.subject',
          'messages',
        ],
      },
    );
  }

  changeTransactionsView({ transactionId, transition, content }) {
    return this.sdk.transactions.transition(
      {
        id: new types.UUID(transactionId),
        transition,
        params: {
          reviewRating: 3,
          reviewContent: content,
        },
      },
      {
        expand: true,
      },
    );
  }

  getReviews({ listingId }) {
    return this.sdk.reviews.query({
      listingId: new types.UUID(listingId),
      // state: 'public',
      // include: ['author', 'author.profileImage'],
    });
  }

  createStripeAccount(query) {
    return this.sdk.stripeAccount.create(query, {
      expand: true,
    });
  }
}

export default new SharetribeSdkService();
