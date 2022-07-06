<p align="center">
  <a href="https://fingerprint.com">
    <img src="resources/logo.svg" alt="FingerprintJS" width="312px" />
  </a>
</p>
<p align="center">
  <a href="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml">
    <img src="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml/badge.svg" alt="Build status">
  </a>
</p>

## Repository content
1. FingerprintJS Pro Google Tag Manager template
2. FingerprintJS Pro adapter for Google Tag Manager

> :warning: **Work in progress**: This is a beta version of the library

# FingerprintJS Pro Google Tag Manager template

You can find an example of using this integration on [our website](https://dev.fingerprint.com/docs/fingerprintjs-pro-google-tag-manager)

## Usage

1. You should have FingerprintJS account
2. Add FingerprintJS Pro Tag in your GTM admin panel (you can find it in the [community template gallery](https://tagmanager.google.com/gallery/) or just import from [github repo](https://github.com/fingerprintjs/fingerprintjs-pro-gtm/blob/master/template.tpl))
3. Set up the public API key and choose the region
4. Use `FingerprintJSPro.loaded` event to get data from dataLayer. You can create trigger for this event.
5. Use `Result custom name` field to change the variable name for the result.

## Template Fields

You can find more info on the FingerprintJS Pro agent documentation page [https://dev.fingerprint.com/docs/js-agent](https://dev.fingerprint.com/docs/js-agent)

`Public API key` - Your public API key that authenticates the agent with the API.

`Region` - The [region](https://dev.fingerprint.com/docs/regions) of your subscription.

`Endpoint` - This parameter should only be used with the [Subdomain integration](https://dev.fingerprint.com/docs/subdomain-integration)
. Specify your custom endpoint here.

`tag` - a customer-provided value or an object that will be saved together with the identification event and will be returned back to you in a webhook message or when you search for the visit in the server API.

`linkedId` - is a way of linking current identification event with a custom identifier. This will allow you to filter visit information when using the [Server API](https://dev.fingerprint.com/docs/server-api)

`Extended result` - The response object includes a confidence score field representing the probability of accurate identification. The extended response object also includes several fields with useful timestamps related to a visitor. See more information on `firstSeenAt/lastSeenAt` timestamps [here](https://dev.fingerprint.com/docs/useful-timestamps).

`Result custom name` - you can specify the result field name in `dataLayer`

# FingerprintJS Pro adapter for Google Tag Manager

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
