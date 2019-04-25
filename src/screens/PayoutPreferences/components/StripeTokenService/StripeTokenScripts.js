import config from '../../../../../config';

export const html = `
  <script src="https://js.stripe.com/v3/"></script>
`;

export function getStripeTokens(data) {
  return `
    const stripe = window.Stripe("${config.STRIPE_API_KEY}");

    async function getTokenAccount() {
      const res = await stripe.createToken("account", {
        business_type: 'individual',
        individual: {
          first_name: '${data.firstName}',
          last_name: '${data.lastName}',
          address: {
            line1: '${data.streetAddress}',
            city: '${data.city}',
            postal_code: '${data.postalCode}',
            country: '${data.country}',
          },
          dob: {
            day: ${Number(data.birthDate)},
            month: ${Number(data.month)},
            year: ${Number(data.year)},
          },
          email: '${data.email}',
          
        },
        tos_shown_and_accepted: true,
      });

      if (res.error) {
        throw res.error.message;
      }

      return res.token.id;
    }

    async function getTokenBankAccount() {
      const res = await stripe.createToken("bank_account", {
        country: "US",
        currency: "usd",
        account_holder_name: '${data.lastName} ${data.firstName}',
        account_holder_type: "individual",
        routing_number: "110000000",
        account_number: "000123456789"
      });

      if (res.error) {
        throw res.error.message;
      }

      return res.token.id;
    }

    async function getTokens() {
      try {
        const accountToken = await getTokenAccount();
        const bankAccountToken = await getTokenBankAccount();
        window.ReactNativeWebView.postMessage(accountToken + "/" + bankAccountToken);
      } catch (err) {
        window.ReactNativeWebView.postMessage("Error: " + err);
      }
    }

  getTokens();
  true;
  `;
}
