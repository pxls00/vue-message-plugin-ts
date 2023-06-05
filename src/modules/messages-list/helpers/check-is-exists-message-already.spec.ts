import type { IMessageItem } from '../index.types'
import checkIsNotExistsMessage from './check-is-not-exists-message'

const messageList: IMessageItem[] = [
  {
    id: 1,
    body: 'Success 1',
    type: 'success',
    class: ['success_1', 'success_2'],
    img: '/public/vite.svg',
  },
  {
    id: 2,
    body: 'Warning 1',
    type: 'warning',
    class: ['warning_1', 'warning_2'],
  },
  {
    id: 3,
    body: 'Error 1',
    type: 'error',
    class: ['error_1', 'error_2'],
    img: '/public/vite.svg',
  },
]

describe('Helper: CheckIsExistsMessageAlready', () => {
  it('check with existable data', () => {
    const messageItem: IMessageItem = messageList[0]
    const result: boolean = checkIsNotExistsMessage(messageItem, messageList)
    expect(result).toBeFalsy()
  })

  it('check with unexistable data', () => {
    const messageItem: IMessageItem = {
      id: 4,
      type: 'custom',
      body: 'Custom 1',
    }
    const result: boolean = checkIsNotExistsMessage(messageItem, messageList)
    expect(result).toBeTruthy()
  })
})
