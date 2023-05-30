import { computed, defineComponent } from 'vue'
import getMessageClass from '@/modules/messages-list/helpers/get-message-class'

// Types
import type { PropType } from 'vue'
import type {
  IMessageItem,
  TMessageField,
} from '@/modules/messages-list/index.types'

export default defineComponent({
  name: 'MessageItem',

  props: {
    message: {
      required: true,
      type: Object as PropType<IMessageItem> | null,
    },
  },

  emits: {
    remove: (_message: IMessageItem) => _message as IMessageItem,
  },

  setup(props, context) {
    /* The removeMessage only works when message has not type === wait */
    function removeMessage(message: IMessageItem): void {
      context.emit('remove', message)
    }

    function getFieldClassList(messageField: TMessageField<undefined>) {
      if (messageField && typeof messageField === 'object') {
        return getMessageClass(messageField.class)
      }
    }

    function getFieldValue(messageField: TMessageField<undefined>) {
      if (messageField && typeof messageField === 'object') {
        return messageField.value
      } else {
        return messageField
      }
    }

    const getMessageImgBlockContent = computed(() => {
      if (props.message.type === 'success') {
        return `&#10003;`
      } else if (props.message.type === 'warning') {
        return '!'
      } else {
        return ''
      }
    })

    const isShowMessageContent = computed(
      () =>
        (typeof props.message.body === 'object' &&
          typeof props.message.body.value === 'string') ||
        typeof props.message.body === 'string'
    )

    return {
      removeMessage,
      getMessageClass,
      getFieldValue,
      getFieldClassList,
      getMessageImgBlockContent,
      isShowMessageContent,
    }
  },
})
