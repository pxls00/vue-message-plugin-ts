import type NewMessageItem from '@/interfaces/messages/new-message-item'
import type MessageItem from '@/interfaces/messages/message-item'

export default function createMessage (message: NewMessageItem): MessageItem {
  const messageItem: MessageItem = {
    title: message.title,
    type: message.type,
    id: Date.now().toString(),
  }

  if (message.duration) {
    messageItem.duration = message.duration
  }

  return messageItem
}
