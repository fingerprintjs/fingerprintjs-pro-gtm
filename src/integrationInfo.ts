import type { LoadOptions } from '@fingerprintjs/fingerprintjs-pro'
import { version } from '../package.json'

export function addIntegrationInfo(loadOptions: LoadOptions) {
  const { integrationInfo = [] } = loadOptions
  loadOptions.integrationInfo = [`fingerprintjs-pro-gtm/${version}`].concat(integrationInfo)
  return loadOptions
}
