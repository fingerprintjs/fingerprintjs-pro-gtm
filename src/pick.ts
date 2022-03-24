export const pick = <O extends Record<string, any>, F extends keyof O>(originalObject: O, fields: F[]): Pick<O, F> => {
  const entries = fields.map((field) => [field, originalObject[field]])
  return Object.fromEntries(entries)
}
