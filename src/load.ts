import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { LoadOptions, GetOptions, GetResult } from '@fingerprintjs/fingerprintjs-pro'
import { addIntegrationInfo } from './integrationInfo'

export const load = (
  loadOptions: LoadOptions,
  getOptions: GetOptions<boolean>,
  callback: (result: GetResult) => void
) => {
  const fpPromise = FingerprintJS.load(addIntegrationInfo(loadOptions))

  fpPromise.then((fp) => fp.get(getOptions)).then((result) => callback(result))
}
