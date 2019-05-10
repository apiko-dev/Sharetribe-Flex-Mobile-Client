// import stripe from 'tipsi-stripe';
// import config from '../../config';

class StripeService {
  init() {
    /* stripe.setOptions({
      publishableKey: config.STRIPE_API_KEY,
    }); */
  }

  /*  paymentRequestWithCardForm(options) {
    return stripe.paymentRequestWithCardForm(options);
  }

  createTokenWithCard(params) {
    return stripe.createTokenWithCard(params);
  } */
}

export default new StripeService();
