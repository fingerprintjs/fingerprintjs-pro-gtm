import type FpJs from '@fingerprintjs/fingerprintjs-pro'
import type { LoadOptions, GetOptions, GetResult } from '@fingerprintjs/fingerprintjs-pro'
import { pick } from './pick'

declare global {
  interface Window {
    FingerprintJS: typeof FpJs
  }
}

export const load = (options: LoadOptions & GetOptions<boolean>, callback: (result: GetResult) => void) => {
  const cdnUrl = `https://fpcdn.io/v3/${options.apiKey}/esm.min.js`
  const fpPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.async = true
    script.src = cdnUrl
    document.head.appendChild(script)
  }).then(() => window.FingerprintJS.load(pick(options, ['region', 'endpoint']) as LoadOptions))

  fpPromise.then((fp) => fp.get(pick(options, ['tag', 'linkedId']))).then((result) => callback(result))
}
