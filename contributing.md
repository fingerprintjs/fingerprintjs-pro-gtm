# Contributing to Fingerprint adapter for Google Tag Manager

Since GTM ([Google Tag Manager](https://tagmanager.google.com/)) uses a subset of the [JavaScript API](https://developers.google.com/tag-platform/tag-manager/templates/sandboxed-javascript) that doesn't support `Promises`, we created this adapter for the [FingerprintJS JS agent](https://docs.fingerprint.com/reference/js-agent-v4) that can be used in a GTM template.

The adapter code is hosted on CDN and accessible at `https://opencdn.fpjs.sh/fingerprintjs-pro-gtm/v1/iife.min.js`.
See the [CDN repository](https://github.com/fingerprintjs/cdn) for more information.

## Usage example

In the GTM template, load the adapter from the CDN:

```javascript
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');
const url = `https://opencdn.fpjs.sh/fingerprintjs-pro-gtm/v1/iife.min.js`;

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

## Working with the code

We prefer using [pnpm](https://pnpm.io/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### How to build

Just run:

```shell
pnpm build
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:

```shell
pnpm lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):
```shell
pnpm lint:fix
```

### How to test

Tests are located in `__tests__` folder and run by [jest](https://jestjs.io/) in [jsdom](https://github.com/jsdom/jsdom) environment.

To run tests you can use IDE instruments or just run:
```shell
pnpm test
```

To check the TypeScript types, run:

```shell
pnpm test:dts
```

### How to publish

We use [changesets](https://github.com/changesets/changesets) for handling release notes. If there are relevant changes, please add them to changeset via `pnpm exec changeset`. You need to run `pnpm install` before doing so.

On every push to the main branch, the [release](.github/workflows/release.yml) workflow executes to find new changesets and create or update a changesets-managed release PR. When that PR is merged, the [release](.github/workflows/release.yml) workflow will publish the adapter package to NPM as [@fingerprint/gtm-adapter](https://www.npmjs.com/package/@fingerprint/gtm-adapter) and create a GitHub release. The workflow must be approved by one of the maintainers, first.

# Contributing to Fingerprint Google Tag Manager template

### Working with the GTM template

The [template.tpl](template.tpl) file contains the source for the GTM template that will inject the JS Agent adapter into the associated window and expose the JS agent results to other tags.
It can validated and debugged by importing the template into your GTM workspace.

[Read more about authoring templates](https://developers.google.com/tag-platform/tag-manager/templates)

### Testing

When adding new features, remember to provide tests that can be run inside the template environment in GTM.

[Read more about tests in GTM](https://developers.google.com/tag-platform/tag-manager/templates/tests)

### Updating the template

After a new GitHub release is published, the [update-gtm-metadata](.github/workflows/update-gtm-metadata.yaml) workflow will open a PR
to update the [metadata.yaml](metadata.yaml) file with details from the latest release.

[Read more about updating templates](https://developers.google.com/tag-platform/tag-manager/templates/gallery#update_your_template)
