import messageCreate from '@/stores/messages/helpers/message-create'
import type IMessageItem from '@/interfaces/messages/message-item'

const MESSAGE_WAIT_ACTION_CREDENTIALS: IMessageItem = messageCreate({
  title: 'Wait please ..',
  type: 'wait'
})

export default MESSAGE_WAIT_ACTION_CREDENTIALS