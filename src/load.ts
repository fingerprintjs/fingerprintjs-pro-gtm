import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import type { LoadOptions, GetOptions, GetResult } from '@fingerprintjs/fingerprintjs-pro'

export const load = (
  loadOptions: LoadOptions,
  getOptions: GetOptions<boolean>,
  callback: (result: GetResult) => void
) => {
  const fpPromise = FingerprintJS.load(loadOptions)

  fpPromise.then((fp) => fp.get(getOptions)).then((result) => callback(result))
}
