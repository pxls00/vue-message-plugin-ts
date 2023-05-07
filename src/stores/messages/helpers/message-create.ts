import type MessageItemBase from '@/interfaces/messages/message-item-base'
import type MessageItem from '@/interfaces/messages/message-item'

export default function createMessage (message: MessageItemBase): MessageItem {
  const messageItem: MessageItem = { ...message, id: Date.now().toString() }

  return messageItem
}
