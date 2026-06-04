import type * as Fingerprint from '@fingerprint/agent'

const mockedAddIntegrationInfo = jest.fn()

jest.mock('@fingerprint/agent')
jest.mock('../src/integrationInfo', () => ({
  addIntegrationInfo: (options: unknown) => mockedAddIntegrationInfo(options),
}))

describe('adapter', () => {
  let agentGet: jest.Mock
  let mockedStart: jest.MockedFunction<typeof Fingerprint.start>
  let adapter: typeof import('../src/adapter')

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    agentGet = jest.fn()
    // Require the mocked agent fresh so it matches the instance used by the
    // freshly-required adapter module after resetModules().
    mockedStart = require('@fingerprint/agent').start
    mockedStart.mockReturnValue({ get: agentGet } as unknown as Fingerprint.Agent)
    mockedAddIntegrationInfo.mockImplementation((options) => options)

    adapter = require('../src/adapter')
  })

  describe('start', () => {
    it('starts the agent with options passed through addIntegrationInfo', () => {
      const options = { apiKey: 'key' } as Fingerprint.StartOptions
      const withInfo = { apiKey: 'key', integrationInfo: ['x'] } as Fingerprint.StartOptions
      mockedAddIntegrationInfo.mockReturnValue(withInfo)

      adapter.start(options)

      expect(mockedAddIntegrationInfo).toHaveBeenCalledWith(options)
      expect(mockedStart).toHaveBeenCalledWith(withInfo)
    })
  })

  describe('get', () => {
    const getOptions = {} as Fingerprint.GetOptions

    it('throws if start was not called first', () => {
      const onFulfilled = jest.fn()
      const onRejected = jest.fn()

      expect(() => adapter.get(getOptions, onFulfilled, onRejected)).toThrow('Call start method first')
      expect(onFulfilled).not.toHaveBeenCalled()
      expect(onRejected).not.toHaveBeenCalled()
    })

    it('passes get options to the agent', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: null })

      adapter.get(getOptions, jest.fn(), jest.fn())

      expect(agentGet).toHaveBeenCalledWith(getOptions)
    })

    it('calls onFulfilled with the sealed_result stringified', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      const sealed = { toString: () => 'sealed-string' }
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: sealed })
      const onFulfilled = jest.fn()
      const onRejected = jest.fn()

      adapter.get(getOptions, onFulfilled, onRejected)
      await Promise.resolve()

      expect(onFulfilled).toHaveBeenCalledWith({ requestId: 'r1', sealed_result: 'sealed-string' })
      expect(onRejected).not.toHaveBeenCalled()
    })

    it('calls onFulfilled with null when sealed_result is null', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: null })
      const onFulfilled = jest.fn()

      adapter.get(getOptions, onFulfilled, jest.fn())
      await Promise.resolve()

      expect(onFulfilled).toHaveBeenCalledWith({ requestId: 'r1', sealed_result: null })
    })

    it('calls onRejected when the agent rejects', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      const reason = new Error('boom')
      agentGet.mockRejectedValue(reason)
      const onFulfilled = jest.fn()
      const onRejected = jest.fn()

      adapter.get(getOptions, onFulfilled, onRejected)
      await Promise.resolve()
      await Promise.resolve()

      expect(onRejected).toHaveBeenCalledWith(reason)
      expect(onFulfilled).not.toHaveBeenCalled()
    })
  })
})
