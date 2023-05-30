import { defineComponent } from 'vue'
import { useMessageStore } from '@/modules/messages-list/store/index'
import { storeToRefs } from 'pinia'
import MessageItem from '@/modules/messages-list/components/messages-item/index.vue'
import type { IMessageItem } from '@/modules/messages-list/index.types'

export default defineComponent({
  name: 'MessageList',

  components: {
    MessageItem,
  },

  setup() {
    const store = useMessageStore()

    const { messages, position } = storeToRefs(store)

    function removeMessage(message: IMessageItem): void {
      store.removeMessage(message.id)
    }

    return {
      messages,
      removeMessage,
      position,
    }
  },
})
