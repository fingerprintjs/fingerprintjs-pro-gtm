# Repository content
1. Fingerprint Pro Google Tag Manager template
2. Fingerprint Pro adapter for Google Tag Manager

# Contributing to Fingerprint Pro adapter for Google Tag Manager

Since GTM ([Google Tag Manager](https://tagmanager.google.com/)) uses a subset of JavaScript API that doesn't support Promises, we created this adapter for the [FingerprintJS Pro JS agent](https://dev.fingerprint.com/docs/js-agent) that can be used in a GTM template.

Adapter code hosted on CDN and accessible via the next URL `https://opencdn.fpjs.sh/fingerprintjs-pro-gtm/v0/iife.min.js`

More information about CDN you can get in [CDN repository](https://github.com/fingerprintjs/cdn)

## Example of usage

In GTM template we can load FingerprintJS Pro this way:

```javascript
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');
const url = 'https://opencdn.fpjs.sh/fingerprintjs-pro-gtm/v0/iife.min.js';

const onSuccess = () => {
  const onFpJsLoad = (result) => {
    const dataLayerPush = createQueue('dataLayer');
    dataLayerPush({
      event: 'FingerprintJS.loaded',
      visitorId: result.visitorId
    });
    data.gtmOnSuccess();
  };

  callInWindow('FingerprintjsProGTM.load', {apiKey: data.apiKey}, onFpJsLoad);
};

// If the script fails to load, log a message and signal failure
const onFailure = () => {
  data.gtmOnFailure();
};

injectScript(url, onSuccess, onFailure);

```

## Working with code

We prefer using [yarn](https://yarnpkg.com/) for installing dependencies and running scripts.

The master branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### How to build
Just run:
```shell
yarn build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:
```shell
yarn lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):
```shell
yarn lint:fix
```

### How to test
Tests are located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:
```shell
yarn test
```

To check the Typescript types, run:
```shell
yarn typecheck
```

### How to publish
- Create a new branch
- Run `yarn release:(major|minor|patch)` depending on the version you need
- Make a pull request
- After merging the pull request into the main branch and after successful tests, GitHub Action will publish a new version to the npm

# Contributing to Fingerprint Pro Google Tag Manager template

### Working with GTM template

After changing the template in GTM panel remember to update the `versions` section in **metadata.yaml**.

[Read more about updating templates](https://developers.google.com/tag-platform/tag-manager/templates/gallery#update_your_template)

### Testing

When adding new features remember to provide tests that can be run inside the template environment in GTM.

[Read more about tests in GTM](https://developers.google.com/tag-platform/tag-manager/templates/tests)
