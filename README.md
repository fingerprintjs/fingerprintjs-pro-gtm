<p align="center">
  <a href="https://fingerprintjs.com">
    <img src="resources/logo.svg" alt="FingerprintJS" width="312px" />
  </a>
</p>
<p align="center">
  <a href="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml">
    <img src="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml/badge.svg" alt="Build status">
  </a>
</p>

Since GTM ([Google Tag Manager](https://tagmanager.google.com/)) uses a subset of JavaScript API that doesn't support Promises, we created this adapter for the [FingerprintJS Pro JS agent](https://dev.fingerprintjs.com/docs) that can be used in a GTM template.

> :warning: **Work in progress**: This is a beta version of the library

## Example of usage

TODO: add link to GTM template when it will be ready

In GTM template use code like this:

```javascript
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');

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
