import type NewMessageItem from '@/interfaces/messages/new-message-item'
import type MessageItem from '@/interfaces/messages/message-item'

interface Toast {
  addNewMessage(message: NewMessageItem): void
  removeMessage(message: MessageItem): void
  waitAction(): void
  stopAction(): void
}

export default Toast
