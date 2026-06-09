---
'@fingerprintjs/fingerprintjs-pro-gtm': major
---

Update GTM template to support JS agent v4. This is a breaking change.
Because the template now uses a different contract for the GTM `dataLayer`, existing GTM tags that use the previous template cannot be updated in place. However, the changes do allow new tags to be created with this template that will not interfere with existing GTM tags.

- Update the `Tag type` parameter to use JS agent v4 terminology.
- Replace the `Script Url Pattern` and `Endpoint` parameters with the `Endpoints` table.
- Remove the `Extended result` parameter. It is no longer needed for JS agent v4.
- Change the default result name to `FingerprintResult` from `FingerprintJSProResult`.
- Rename custom event `FingerprintJSPro.loaded` to `Fingerprint.started`.
- Rename custom event `FingerprintJSPro.identified` to `Fingerprint.identified`.
- The result set in the GTM `dataLayer` uses the JS agent v4 result shape. See the [v4 get function documentation](https://docs.fingerprint.com/reference/js-agent-v4-get-function#get-response-fields) for details.
