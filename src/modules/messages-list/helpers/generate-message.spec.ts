import generateMessage from './generate-message'
import type { IMessageBase, IMessageItem } from '../index.types'

describe('Helper: generateMessage', () => {
  it('gets base item message and adds him id parametr with value Data.now()', () => {
    const item: IMessageBase = {
      body: 'test 1',
      type: 'error',
    }
    const result: IMessageItem = generateMessage(item)
    expect('id' in result).toBeTruthy()
  })
})
