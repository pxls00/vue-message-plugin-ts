import type {
  IMessageBase,
  IMessageItem,
} from '@/modules/messages-list/index.types'

export default function createMessage(message: IMessageBase): IMessageItem {
  const messageItem: IMessageItem = { ...message, id: Date.now().toString() }

  return messageItem
}
