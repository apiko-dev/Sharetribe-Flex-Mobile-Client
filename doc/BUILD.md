# Build Sharetribe Flex Mobile Client

## Configure config file

Create `./config` folder in the root of the project and `index.js` file in it, with next parameters

`./config/index.js`
```
export default {
  MARKETPLACE_ID: 'Your Sharetribe-Flex marketplace id',
  GOOGLE_API_KEY: 'Your Google Api key',
  SENTRY_DNS:
    'Your sentry DNS URL',
  STRIPE_API_KEY: 'Your Stripe publish key',
  STRIPE_CLIENT_ID: 'Your Stripe client key',
}
```

1. Get Stripe keys.
You can get stripe keys by registration on https://stripe.com/ and configuring your stipe account. 
More information you can find here: https://stripe.com/docs

2. Get Sharetribe-Flex marketplace id.
You can get Sharetribe-Flex marketplace id here: https://www.sharetribe.com/

3. Get Google API key.
Instruction how to get Google API key: https://developers.google.com/maps/documentation/javascript/get-api-key.
We use the Google API for Google Maps and Google autocomplete.
You need to enable this functionality for your key in order that everything works properly.

4. After it your need configure sentry. Create file `sentry.properties` in `./android` folder:
`./android/sentry.properties`
``` 
defaults.url=https://sentry.io/
defaults.org=your-organization-name
defaults.project=your-project-name
auth.token=your-project-auth-token
cli.executable=node_modules/@sentry/cli/bin/sentry-cli
```

How to do it you can find here by registration sentry account: https://sentry.io/welcome/

## Build android release apk

1. Make sure that you have installed and configured Android SDK, 
how to do it, you can find here by selecting `React Native CLI Quickstart` 
your Development OS and Target OS `Android`:
https://facebook.github.io/react-native/docs/getting-started

1. After it create file `local.properties` in `./android` folder that will have a path to your Android SDK:
`./android/local.properties`
``` 
sdk.dir=path_to_your_android_sdk
```

3. How to build android release APK you can find here: 
https://facebook.github.io/react-native/docs/signed-apk-android
