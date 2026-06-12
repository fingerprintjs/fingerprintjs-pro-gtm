# Fingerprint Google Tag Manager Template

## 2.0.0-test.1

### Patch Changes

- Remove `private` property from package.json. This is a temporary changeset to trigger the next prerelease. ([db005a0](https://github.com/fingerprintjs/gtm-integration/commit/db005a0f7888719e5786f8552179cd5f05617878))

## 2.0.0-test.0

### Major Changes

- Switch to JS Agent v4 (`@fingerprint/agent`) in the GTM adapter. This is a breaking change.

  - Replace the `load` wrapper with the new `start` wrapper, invoking `Fingerprint.start` rather than the JS agent v3 `load` function. See the [start reference page](https://docs.fingerprint.com/reference/js-agent-v4-start-function) for the options supported by `start`.
  - `start` does not require a callback because it is a synchronous call, unlike `load`, which was asynchronous.
  - Update the `get` wrapper to use the options from `Fingerprint.get` function internally. See the [get reference page](https://docs.fingerprint.com/reference/js-agent-v4-get-function) for the options supported by `get`. The definition for the return value from `get` can also be found on that page with the difference that `sealed_result`, when set, is a `string` rather than a `BinaryOutput`. ([b31c893](https://github.com/fingerprintjs/gtm-integration/commit/b31c893fafeac8d9b8eec9d12622fb62e2bc8dfc))

- Update GTM template to support JS agent v4. This is a breaking change.
  Because the template now uses a different contract for the GTM `dataLayer`, existing GTM tags that use the previous template cannot be updated in place. However, the changes do allow new tags to be created with this template that will not interfere with existing GTM tags.

  - Update the `Tag type` parameter to use JS agent v4 terminology.
  - Replace the `Script Url Pattern` and `Endpoint` parameters with the `Endpoints` table.
  - Remove the `Extended result` parameter. It is no longer needed for JS agent v4.
  - Change the default result name to `FingerprintResult` from `FingerprintJSProResult`.
  - Rename custom event `FingerprintJSPro.loaded` to `Fingerprint.started`.
  - Rename custom event `FingerprintJSPro.identified` to `Fingerprint.identified`.
  - The result set in the GTM `dataLayer` uses the JS agent v4 result shape. See the [v4 get function documentation](https://docs.fingerprint.com/reference/js-agent-v4-get-function#get-response-fields) for details. ([78c1092](https://github.com/fingerprintjs/gtm-integration/commit/78c1092e994ed8abcb9169bb4a65517893313995))

## [1.1.0](https://github.com/fingerprintjs/gtm-integration/compare/v1.0.0...v1.1.0) (2024-03-28)

### Features

- add identification request timing ([2c97d3e](https://github.com/fingerprintjs/gtm-integration/commit/2c97d3e4caf95423a961554caa25ed81a1ad9c39))
- create tag version with 3 roles: load, identify and load + identify ([4ae0f7b](https://github.com/fingerprintjs/gtm-integration/commit/4ae0f7b90bbbf25f7c93aa809a76e5e153b4b160))

### Bug Fixes

- show tag settings depends on tag type ([b77ddba](https://github.com/fingerprintjs/gtm-integration/commit/b77ddba7e55cc43aedd99adbc6b044159ea29bcb))

### Documentation

- **README:** add description to the `Tag type` template field ([dc4b3b2](https://github.com/fingerprintjs/gtm-integration/commit/dc4b3b24cfc422fe8077b6023f9592782ed0dba3))
- **README:** remove beta warning ([c3c13dc](https://github.com/fingerprintjs/gtm-integration/commit/c3c13dc401f45d58b92ca0f6755ef492f33ba9d2))
- **README:** update readme ([7e46ee5](https://github.com/fingerprintjs/gtm-integration/commit/7e46ee5c68acf03f9cc4cf054cc26775d39ecc10))

## 1.0.0 (2023-04-07)

##### Chores

- **deps:**
  - bump json5 from 2.2.0 to 2.2.3 ([67fc05a9](https://github.com/fingerprintjs/gtm-integration/commit/67fc05a9858b57fc19c70bebd58e9a97337e7b62))
  - bump rollup-plugin-license ([27dae632](https://github.com/fingerprintjs/gtm-integration/commit/27dae63247d86cb0854354a7261527ae4db4503a))
  - bump minimist from 1.2.5 to 1.2.6 ([7472efba](https://github.com/fingerprintjs/gtm-integration/commit/7472efbafe4386187b59fd06dc4c9de283ac513e))
- add production environment for publish task ([09a15c0a](https://github.com/fingerprintjs/gtm-integration/commit/09a15c0a0140693179f402bbaeb94a3683aaf317))
- update documentation link ([58cfb7ee](https://github.com/fingerprintjs/gtm-integration/commit/58cfb7ee8ce18773e4aa5af141e59d5d966c2f67))

##### Documentation Changes

- rename the custom subdomain feature name ([89038318](https://github.com/fingerprintjs/gtm-integration/commit/8903831891281cd93f753d003965803b508e7336))
- update Fingerprint logo ([d0fa722c](https://github.com/fingerprintjs/gtm-integration/commit/d0fa722c2f55bcaf59c4aaefe098544010ed92ac))
- replace fingerprintjs.com to fingerprint.com ([a7850334](https://github.com/fingerprintjs/gtm-integration/commit/a785033409d59fcc61b00af3cb556bf775bb28e2))
- remove whitespace ([ada10547](https://github.com/fingerprintjs/gtm-integration/commit/ada1054748f77a776c6f6f518a59471b3ee95704))
- Split contributing file into 2 products ([e5c21832](https://github.com/fingerprintjs/gtm-integration/commit/e5c21832c09a76e028c7b7b013d22088ccb4f9f1))
- Add CODEOWNERS ([d5a05a0b](https://github.com/fingerprintjs/gtm-integration/commit/d5a05a0b6bfbe60986c82817d35c0f00cb0228e0))
- Add contributing rules ([e2516fbb](https://github.com/fingerprintjs/gtm-integration/commit/e2516fbb737976707cc941913610d1076284335a))
- fix markdown for headers in readme ([9de5a154](https://github.com/fingerprintjs/gtm-integration/commit/9de5a154c8a793d4035cd305d565388c9739a305))
- update readme ([35382e8d](https://github.com/fingerprintjs/gtm-integration/commit/35382e8da075ac869a63faa95f5de6f41e349a6c))
- change license to Apache 2.0 ([e8bdac2d](https://github.com/fingerprintjs/gtm-integration/commit/e8bdac2d91e890e934ce9c6bd23b2feed91a54fe))
- update description ([44cf8079](https://github.com/fingerprintjs/gtm-integration/commit/44cf8079f9335b1105c31341628fc78aaa312a0a))
- **README:** remove GTM Gallery mention ([cc08755f](https://github.com/fingerprintjs/gtm-integration/commit/cc08755fbbaea55a6707a388b83db56cef4c745d))

##### New Features

- separate `load` and `get` logic ([188d2e89](https://github.com/fingerprintjs/gtm-integration/commit/188d2e89d880c9efd5e1171d6adef13b901054a0))

## 0.3.0 (2022-03-29)

##### Chores

- remove iife format ([090daddc](https://github.com/fingerprintjs/gtm-integration/commit/090daddcd007881577ce4bbaf7c26aa8388f7c91))
- add typecheck to build action ([c703b234](https://github.com/fingerprintjs/gtm-integration/commit/c703b234df81725369de5ee72514bea84a864c79))
- allow rollup to remove unused code from deps ([ca071f39](https://github.com/fingerprintjs/gtm-integration/commit/ca071f3949c9908b231b7b9785b82dde69c7e8ed))
- generate only esm module ([94981e1c](https://github.com/fingerprintjs/gtm-integration/commit/94981e1cb922a0ff2ea9308e75c1c74112276415))
- move rollup resolve to devDependencies section ([7458c77a](https://github.com/fingerprintjs/gtm-integration/commit/7458c77a9218b41d7da4539d130ba793d964919a))

##### Documentation Changes

- update README.md ([a6931ecf](https://github.com/fingerprintjs/gtm-integration/commit/a6931ecfb753c4a48e3ceee9d99526397065a048))
- add ci badge, add beta notice ([b5f0aceb](https://github.com/fingerprintjs/gtm-integration/commit/b5f0acebab7739b45b8f166734971a94022d8c56))

##### New Features

- add integrationInfo to loadOptions ([aff41286](https://github.com/fingerprintjs/gtm-integration/commit/aff412863fa4f6d947e4ccc6fedc588ca64733f9))
- use separate options for load and get ([7c8eaa0c](https://github.com/fingerprintjs/gtm-integration/commit/7c8eaa0c2fb3119e552022f0347e15f7dccf6000))
- use new fpjs-pro agent v3.6.0 ([3bb739ef](https://github.com/fingerprintjs/gtm-integration/commit/3bb739efce45fdececaac7f4d002296c25673a99))
- support endpoint, tag and linkedIt options ([b264b849](https://github.com/fingerprintjs/gtm-integration/commit/b264b849dc972b41a727b1ed5f6ebb5d05254e8a))

##### Bug Fixes

- pick function, tests ([0b22e61a](https://github.com/fingerprintjs/gtm-integration/commit/0b22e61a9d75c91edd40c19aaa35fb4fbeb72f9b))
- remove unnecessary esm build ([1723ace3](https://github.com/fingerprintjs/gtm-integration/commit/1723ace303290f4dabc1218f0e3ded1172d53826))

### 0.2.0 (2022-03-22)

#### 0.1.1 (2022-03-22)

### 0.1.0 (2022-03-22)
