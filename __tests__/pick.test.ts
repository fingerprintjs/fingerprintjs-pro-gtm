import { pick } from '../src/pick'

const mockObject = { a: 1, b: 2, c: 3 }

describe('Pick function', () => {
  it('should pick a and c fields', () => {
    expect(pick(mockObject, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 })
  })

  it('should pick only existing field b', () => {
    expect(pick(mockObject, ['b', 'd'])).toStrictEqual({ b: 2 })
  })

  it('should return empty object', () => {
    expect(pick(mockObject, ['d', 'f'])).toStrictEqual({})
  })
})
