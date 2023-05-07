import type MessageItemFIeld from '@/interfaces/messages/types/message-field'
import type MessageItemCLass from '@/interfaces/messages/types/message-class'

interface MessageWait {
  title: MessageItemFIeld | any
  img?: MessageItemFIeld,
  class?: MessageItemCLass,
  type?: 'wait'
}

export default MessageWait
