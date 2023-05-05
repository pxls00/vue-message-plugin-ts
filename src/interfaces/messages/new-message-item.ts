import type MessageTypes from '@/interfaces/messages/types/message'

interface Message {
  title: string
  duration?: number
  type: MessageTypes
}

export default Message
