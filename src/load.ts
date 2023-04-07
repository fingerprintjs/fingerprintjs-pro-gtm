import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { LoadOptions, GetOptions, GetResult } from '@fingerprintjs/fingerprintjs-pro'
import { addIntegrationInfo } from './integrationInfo'

let fpPromise: Promise<FingerprintJS.Agent> | undefined

export const load = (loadOptions: LoadOptions, callback: () => void) => {
  fpPromise = FingerprintJS.load(addIntegrationInfo(loadOptions))
  fpPromise.then(() => callback())
}

export const get = (getOptions: GetOptions<boolean>, callback: (result: GetResult) => void) => {
  if (!fpPromise) {
    throw new Error('Call load method first')
  }
  fpPromise.then((fp) => fp.get(getOptions)).then((result) => callback(result))
}
