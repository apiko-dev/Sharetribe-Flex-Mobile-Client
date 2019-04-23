import stripe from 'tipsi-stripe';
import axios from 'axios';
import config from '../../config';

const CONNECT_STRIPE_TOKEN_URL =
  'https://connect.stripe.com/oauth/token';
const CONNECT_STRIPE_AUTH_URL =
  'https://connect.stripe.com/express/oauth/authorize?';

const AUTHORIZE_STRIPE_URL = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=${
  config.STRIPE_CLIENT_ID
}&`;
class StripeService {
  init() {
    stripe.setOptions({
      publishableKey: config.STRIPE_API_KEY,
    });
  }

  paymentRequestWithCardForm(options) {
    return stripe.paymentRequestWithCardForm(options);
  }

  createTokenWithCard(params) {
    return stripe.createTokenWithCard(params);
  }

  createAccount() {
    return axios.get(
      `${this.STRIPE_URL + this.REDIRECT_URL}=${this.URL}`,
    );
  }

  formUrl(data) {
    const stripeUserQuery = `stripe_user[email]=${
      data.email
    }&stripe_user[first_name]=${
      data.firstName
    }&stripe_user[last_name]=${data.lastName}&stripe_user[dob_day]=${
      data.birthDate
    }&stripe_user[dob_month]=${data.month}&stripe_user[dob_year]=${
      data.year
    }&stripe_user[business_type]=individual`;

    return `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=${
      config.STRIPE_CLIENT_ID
    }&${stripeUserQuery}`;
  }

  completedAccountConnection(code) {
    return axios.post(CONNECT_STRIPE_TOKEN_URL, {
      client_secret: config.STRIPE_SECRET_KEY,
      code,
      grant_type: 'authorization_code',
    });
  }

  getAccessToken(token) {
    return axios.post(CONNECT_STRIPE_TOKEN_URL, {
      client_secret: config.STRIPE_SECRET_KEY,
      refresh_token: token,
      grant_type: 'refresh_token',
    });
  }
}

export default new StripeService();
