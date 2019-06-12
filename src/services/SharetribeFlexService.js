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
      expand: true,
      include: ['profileImage'],
    });
  }

  updateAvatar(avatarId) {
    const profileImageId = new types.UUID(avatarId);
    return this.sdk.currentUser.updateProfile(
      {
        profileImageId,
      },
      {
        expand: true,
        include: ['profileImage'],
      },
    );
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
        processAlias: 'preauth-with-nightly-booking/insta-reviews',
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
        ],
      },
    );
  }

  initiateSpeculativelyTransaction({
    listingId,
    startRent,
    endRent,
    cardToken,
  }) {
    return this.sdk.transactions.initiateSpeculative(
      {
        processAlias: 'preauth-with-nightly-booking/insta-reviews',
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
        ],
      },
    );
  }

  initiateMessageTransaction(listId) {
    console.log('run service... ');
    return this.sdk.transactions.initiate(
      {
        processAlias: 'preauth-with-nightly-booking/insta-reviews',
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
      lastTransitions: [
        'transition/request',
        'transition/enquire',
        'transition/request-after-enquiry',
        'transition/accept',
        'transition/decline',
        'transition/complete',
        'transition/expire-provider-review-period',
        'transition/review-1-by-customer',
      ],
      include: [
        'customer',
        'customer.profileImage',
        'provider',
        'provider.profileImage',
        'listing',
        // 'listing.images',
        'booking',
        // 'reviews',
        // 'reviews.author',
        // 'reviews.subject',
      ],
      ...params,
    });
  }

  // fetchCountIncomingTransaction(params) {
  //   return this.sdk.transactions.query({
  //     only: 'sale',
  //     lastTransitions: [
  //       'transition/request',
  //       'transition/request-after-enquiry',
  //     ],
  //   });
  // }

  transactionsShow({ transactionId }) {
    return this.sdk.transactions.show({
      id: new types.UUID(transactionId),
      include: [
        'customer',
        'customer.profileImage',
        'provider',
        'provider.profileImage',
        'listing',
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
        include: ['listing', 'booking', 'messages'],
      },
    );
  }

  changeTransactionsView({
    transactionId,
    transition,
    content,
    rating,
  }) {
    return this.sdk.transactions.transition(
      {
        id: transactionId,
        transition,
        params: {
          reviewRating: rating,
          reviewContent: content,
        },
      },
      {
        expand: true,
        include: ['reviews', 'reviews.author', 'reviews.subject'],
      },
    );
  }

  fetchReviews({ params }) {
    return this.sdk.reviews.query({
      ...params,
      state: 'public',
      type: 'ofProvider',
      include: [
        'author',
        'author.profileImage',
        'listing',
        'reviews',
        'reviews.author',
        'reviews.subject',
      ],
    });
  }

  createStripeAccount(query) {
    return this.sdk.stripeAccount.create(query, {
      expand: true,
    });
  }

  retrievePerson(query) {
    return this.sdk.stripeAccount.retrievePerson(...query, {
      expand: true,
    });
  }
}

export default new SharetribeSdkService();
