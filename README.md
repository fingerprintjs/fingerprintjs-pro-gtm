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

Adapter for [FingerprintJS Pro JS agent](https://dev.fingerprintjs.com/docs) to use in [Google Tag Manager (GTM)](https://tagmanager.google.com/) template. GTM uses javascript subset that doesn't support Pomises and this is the reason for this library.

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
