import * as Fingerprint from '@fingerprint/agent'
import { addIntegrationInfo } from './integrationInfo'

let agent: Fingerprint.Agent | undefined = undefined

export const start = (options: Fingerprint.StartOptions) => {
  agent = Fingerprint.start(addIntegrationInfo(options))
}

export type SandboxSafeGetResult = Omit<Fingerprint.GetResult, 'sealed_result'> & { sealed_result: string | null }

export const get = (
  getOptions: Fingerprint.GetOptions,
  onFulfilled: (result: SandboxSafeGetResult) => void,
  onRejected: (reason: any) => void
) => {
  if (!agent) {
    throw new Error('Call start method first')
  }

  agent
    .get(getOptions)
    .then((result) =>
      onFulfilled({
        ...result,
        // Unwrap the sealed result, if set, because the BinaryOutput functions won't
        // be callable across the sandbox boundary.
        sealed_result: result.sealed_result ? result.sealed_result.toString() : null,
      })
    )
    .catch((reason) => onRejected(reason))
}
