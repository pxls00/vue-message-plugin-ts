import getMessageClass from './get-message-class'

describe('Helper: getMessageClass', () => {
  it('check getMessageClass with array and he should return us their join string with " "', () => {
    const classList = ['test test_2']
    const result = getMessageClass(classList)
    expect(result).toBe(classList.join(' '))
  })
  it('check getMessageClass with default class name and he should return just class name', () => {
    const className = 'test test_2'
    const result = getMessageClass(className)
    expect(result).toBe(className)
  })
})
