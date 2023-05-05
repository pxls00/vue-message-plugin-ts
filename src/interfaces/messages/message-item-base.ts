import type MessageTypes from '@/interfaces/messages/types/message'
import type MessageItemFIeld from '@/interfaces/messages/types/message-field'
import type MessageItemCLass from '@/interfaces/messages/types/message-class'

interface Message {
  title: MessageItemFIeld | any
  duration?: number
  type: MessageTypes,
  img?: MessageItemFIeld,
  class?: MessageItemCLass,
  key?: string
}

export default Message
