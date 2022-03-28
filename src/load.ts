import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import type { LoadOptions, GetOptions, GetResult } from '@fingerprintjs/fingerprintjs-pro'
import { pick } from './pick'

export const load = (options: LoadOptions & GetOptions<boolean>, callback: (result: GetResult) => void) => {
  const fpPromise = FingerprintJS.load(pick(options, ['region', 'endpoint']) as LoadOptions)

  fpPromise.then((fp) => fp.get(pick(options, ['tag', 'linkedId']))).then((result) => callback(result))
}
