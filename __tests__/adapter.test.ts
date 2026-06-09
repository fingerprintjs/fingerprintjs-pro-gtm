import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import * as Fingerprint from '@fingerprint/agent'
import { addIntegrationInfo } from '../src/integrationInfo'
import * as adapter from '../src/adapter'

vi.mock('@fingerprint/agent')
vi.mock('../src/integrationInfo')

const mockedStart = vi.mocked(Fingerprint.start)
const mockedAddIntegrationInfo = vi.mocked(addIntegrationInfo)

describe('adapter', () => {
  let agentGet: Mock

  beforeEach(() => {
    // Reset the adapter's module-level agent to undefined by driving start
    // with a mock that returns undefined.
    mockedStart.mockReturnValue(undefined as unknown as Fingerprint.Agent)
    adapter.start({} as Fingerprint.StartOptions)

    vi.clearAllMocks()

    agentGet = vi.fn()
    mockedStart.mockReturnValue({ get: agentGet } as unknown as Fingerprint.Agent)
    mockedAddIntegrationInfo.mockImplementation((options) => options as ReturnType<typeof addIntegrationInfo>)
  })

  describe('start', () => {
    it('starts the agent with options passed through addIntegrationInfo', () => {
      const options = { apiKey: 'key' } as Fingerprint.StartOptions
      const withInfo = { apiKey: 'key', integrationInfo: ['x'] } as Fingerprint.StartOptions
      mockedAddIntegrationInfo.mockReturnValue(withInfo as ReturnType<typeof addIntegrationInfo>)

      adapter.start(options)

      expect(mockedAddIntegrationInfo).toHaveBeenCalledWith(options)
      expect(mockedStart).toHaveBeenCalledWith(withInfo)
    })
  })

  describe('get', () => {
    const getOptions = {} as Fingerprint.GetOptions

    it('throws if start was not called first', () => {
      const onFulfilled = vi.fn()
      const onRejected = vi.fn()

      expect(() => adapter.get(getOptions, onFulfilled, onRejected)).toThrow('Call start method first')
      expect(onFulfilled).not.toHaveBeenCalled()
      expect(onRejected).not.toHaveBeenCalled()
    })

    it('passes get options to the agent', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: null })

      adapter.get(getOptions, vi.fn(), vi.fn())

      expect(agentGet).toHaveBeenCalledWith(getOptions)
    })

    it('calls onFulfilled with the sealed_result stringified', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      const sealed = { toString: () => 'sealed-string' }
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: sealed })
      const onFulfilled = vi.fn()
      const onRejected = vi.fn()

      adapter.get(getOptions, onFulfilled, onRejected)
      await Promise.resolve()

      expect(onFulfilled).toHaveBeenCalledWith({ requestId: 'r1', sealed_result: 'sealed-string' })
      expect(onRejected).not.toHaveBeenCalled()
    })

    it('calls onFulfilled with null when sealed_result is null', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      agentGet.mockResolvedValue({ requestId: 'r1', sealed_result: null })
      const onFulfilled = vi.fn()

      adapter.get(getOptions, onFulfilled, vi.fn())
      await Promise.resolve()

      expect(onFulfilled).toHaveBeenCalledWith({ requestId: 'r1', sealed_result: null })
    })

    it('calls onRejected when the agent rejects', async () => {
      adapter.start({ apiKey: 'key' } as Fingerprint.StartOptions)
      const reason = new Error('boom')
      agentGet.mockRejectedValue(reason)
      const onFulfilled = vi.fn()
      const onRejected = vi.fn()

      adapter.get(getOptions, onFulfilled, onRejected)
      await Promise.resolve()
      await Promise.resolve()

      expect(onRejected).toHaveBeenCalledWith(reason)
      expect(onFulfilled).not.toHaveBeenCalled()
    })
  })
})
