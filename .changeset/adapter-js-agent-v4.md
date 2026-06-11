---
'@fingerprint/gtm-adapter': major
---

Switch to JS Agent v4 (`@fingerprint/agent`) in the GTM adapter. This is a breaking change.

- Replace the `load` wrapper with the new `start` wrapper, invoking `Fingerprint.start` rather than the JS agent v3 `load` function. See the [start reference page](https://docs.fingerprint.com/reference/js-agent-v4-start-function) for the options supported by `start`.
- `start` does not require a callback because it is a synchronous call, unlike `load`, which was asynchronous.
- Update the `get` wrapper to use the options from `Fingerprint.get` function internally. See the [get reference page](https://docs.fingerprint.com/reference/js-agent-v4-get-function) for the options supported by `get`. The definition for the return value from `get` can also be found on that page with the difference that `sealed_result`, when set, is a `string` rather than a `BinaryOutput`.
