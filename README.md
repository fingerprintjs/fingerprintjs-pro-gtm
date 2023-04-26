<p align="center">
  <a href="https://fingerprint.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="resources/logo_light.svg" />
      <source media="(prefers-color-scheme: light)" srcset="resources/logo_dark.svg" />
      <img src="resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml">
    <img src="https://github.com/fingerprintjs/fingerprintjs-pro-gtm/actions/workflows/build.yml/badge.svg" alt="Build status">
  </a>
</p>

# Fingerprint Pro Google Tag Manager template

This repository contains a Google Tag Manager template you can use to add [Fingerprint Pro](https://fingerprint.com/) to your website.  

For step-by-step instructions on using this integration, see the full [Google Tag Manager guide](https://dev.fingerprint.com/docs/fingerprintjs-pro-google-tag-manager) in the Fingeprint Pro documentation.

## Usage

1. [Sign up](https://dashboard.fingerprint.com/signup) for a Fingerprint Pro account if you haven't already.
2. Import this [template](https://github.com/fingerprintjs/fingerprintjs-pro-gtm/blob/master/template.tpl) into your Google Tag Manager workspace.
3. Add a Fingerprint Pro tag to your website. You will need your public API key and application region.
4. Use the `FingerprintJSProResult` or your own *Custom result name* to access the Fingerprint Pro result in GTM's `dataLayer`.
5. Use `FingerprintJSPro.loaded` and `FingerprintJSPro.identified` to create custom events and trigger actions after the JS agent is loaded or the visitor is identified. 

## Template Fields

For more information and the full API reference, see [Fingerprint Pro JS Agent](https://dev.fingerprint.com/docs/js-agent) in our documentation.

`Tag type` – The way you want to use the tag. There are 3 options:
  - `Load and identify` – the default behavior. Load the JS agent and identify the browser immediately. If you want to load the JS agent first and identify the browser later based on some event, use two separate `Load` and `Identify` Fingerprint Pro tags. 
  - `Load` – only load the JS Agent.
  - `Identify` – identify the browser. The JS Agent must be loaded before. You can collect additional metadata data first and then trigger this tag with the metadata inside `linkedId` or `tag`.

`Public API key` - Your public API key that authenticates the agent with the API.

`Region` - The [region](https://dev.fingerprint.com/docs/regions) of your subscription.

`Endpoint` - This parameter should only be used with the [Custom subdomain](https://dev.fingerprint.com/docs/subdomain-integration). Specify your custom endpoint here.

`tag` - a customer-provided value or an object that will be saved together with the identification event and will be returned back to you in a webhook message or when you search for the visit in the server API.

`linkedId` - is a way of linking current identification event with a custom identifier. This will allow you to filter visit information when using the [Server API](https://dev.fingerprint.com/docs/server-api)

`Extended result` - The response object includes a confidence score field representing the probability of accurate identification. The extended response object also includes several fields with useful timestamps related to a visitor. See more information on `firstSeenAt/lastSeenAt` timestamps [here](https://dev.fingerprint.com/docs/useful-timestamps).

`Result custom name` - you can specify the result field name in `dataLayer`.

## Limitations

Some advanced JavaScript agent properties (`tlsEndpoint`, `disableTls`, and `storageKey`) are not currently supported. If you require to use these features in the GTM, please contact [support](mailto:support@fingerprint.com).

Ad-blocking browser extensions such as AdBlock, uBlock Origin, etc., can block all scripts served by Google Tag Manager, including Fingerprint. If this is a problem for your use case, see Google Tag Manager documentation for [Server-side tagging](https://developers.google.com/tag-platform/tag-manager/server-side) and [Custom domain configuration](https://developers.google.com/tag-platform/tag-manager/server-side/custom-domain).
