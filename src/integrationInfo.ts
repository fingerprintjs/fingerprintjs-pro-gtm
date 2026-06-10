import { type StartOptions } from '@fingerprint/agent'
import { version } from '../package.json'

export function addIntegrationInfo(startOptions: StartOptions) {
  const { integrationInfo = [] } = startOptions
  return {
    ...startOptions,
    integrationInfo: [`fingerprintjs-pro-gtm/${version}`].concat(integrationInfo),
  }
}
