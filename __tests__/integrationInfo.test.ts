import { addIntegrationInfo } from '../src/integrationInfo'
import { version } from '../package.json'

describe('Add integration info', () => {
  it('to empty field', () => {
    const options = {
      apiKey: 'key',
    }

    const expectedResult = {
      apiKey: 'key',
      integrationInfo: [`fingerprintjs-pro-gtm/${version}`],
    }

    expect(addIntegrationInfo(options)).toEqual(expectedResult)
  })

  it('to existing field', () => {
    const options = {
      apiKey: 'key',
      integrationInfo: ['fingerprintjs-pro-gtm-tag/1.0.0'],
    }

    const expectedResult = {
      apiKey: 'key',
      integrationInfo: [`fingerprintjs-pro-gtm/${version}`, 'fingerprintjs-pro-gtm-tag/1.0.0'],
    }

    expect(addIntegrationInfo(options)).toEqual(expectedResult)
  })
})
