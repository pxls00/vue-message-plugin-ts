import type IdType from '@/interfaces/types/id'
import type NewMessageItem from '@/interfaces/messages/new-message-item'

interface Message extends NewMessageItem {
  id: IdType
}

export default Message
