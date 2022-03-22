export const pick = (originalObject: Object, fields: string[]) => {
  return Object.fromEntries(Object.entries(originalObject).filter(([key]) => fields.includes(key)))
}
