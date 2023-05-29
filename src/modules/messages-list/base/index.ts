import { defineComponent, computed } from 'vue'
import { useMessageStore } from '@/modules/messages-list/store/index'
import { storeToRefs } from 'pinia'
import MessageItem from '@/modules/messages-list/components/messages-item/index.vue'
import { MESSAGE_WAIT_ACTION_CREDENTIALS } from '@/modules/messages-list/constants/default-data'
import type {
  IMessageItem,
  IMessageWait,
} from '@/modules/messages-list/components/messages-item/index.types'

export default defineComponent({
  name: 'MessageList',

  components: {
    MessageItem,
  },

  setup() {
    const store = useMessageStore()

    const { messages, wait, position, isWait } = storeToRefs(store)

    const messageWait = computed<IMessageWait>(() => {
      if (wait.value) {
        return wait.value
      }
      return MESSAGE_WAIT_ACTION_CREDENTIALS
    })

    function removeMessage(message: IMessageItem): void {
      store.removeMessage(message)
    }

    return {
      messages,
      messageWait,
      removeMessage,
      position,
      isWait,
    }
  },
})
