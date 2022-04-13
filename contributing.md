# Contributing to FingerprintJS Pro adapter for Google Tag Manager

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

# Contributing to FingerprintJS Pro Google Tag Manager template

### Working with GTM template

After changing the template in GTM panel remember to update the `versions` section in **metadata.yaml**.

[Read more about updating templates](https://developers.google.com/tag-platform/tag-manager/templates/gallery#update_your_template)

### Testing

When adding new features remember to provide tests that can be run inside the template environment in GTM.

[Read more about tests in GTM](https://developers.google.com/tag-platform/tag-manager/templates/tests)
