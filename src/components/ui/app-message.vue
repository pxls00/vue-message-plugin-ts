<template>
  <li :class="[props.message ? props.message?.type : 'wait', 'message__item']">
    <div class="message__item__icon">
      <slot v-if="!props.message?.type" name="message__icon-wait" />
      <slot
        v-if="props.message?.type === 'success'"
        name="message__icon-success"
      />
      <slot
        v-if="props.message?.type === 'error'"
        name="message__icon-error"
      />
      <slot
        v-if="props.message?.type === 'warning'"
        name="message__icon-warning"
      />
      <div
        v-if="!props.message && !$slots['message__icon-wait']"
        class="lds-hourglass"
      />
      <div
        v-if="
          props.message?.type === 'success' && !$slots['message__icon-success']
        "
        class="message__item__tick"
      >
        &#10003;
      </div>
      <div
        v-if="props.message?.type === 'error' && !$slots['message__icon-error']"
        class="message__item__error"
      />
      <div
        v-if="
          props.message?.type === 'warning' && !$slots['message__icon-warning']
        "
        class="message__item__warning"
      >
        !
      </div>
    </div>
    <div class="message__item__title">
      <slot v-if="!props.message?.type" name="message__title-wait" />
      <slot
        v-if="props.message?.type === 'success'"
        name="message__title-success"
        :title="props.message?.title"
      />
      <slot
        v-if="props.message?.type === 'error'"
        name="message__title-error"
        :title="props.message?.title"
      />
      <slot
        v-if="props.message?.type === 'warning'"
        name="message__title-warning"
        :title="props.message?.title"
      />
      <p v-if="!$slots['message__title-success']">
        {{ props.message?.title || 'Wait please' }}
      </p>
    </div>
    <button
      v-if="props.message"
      type="button"
      class="message__item__close"
      @click="removeMessage(props.message)"
    >
      &times;
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppToast',
})
</script>

<script lang="ts" setup>
import type Message from '@/interfaces/messages/message-item.js'

interface ToastProps {
  message?: Message
}
const props = defineProps<ToastProps>()
const emits = defineEmits<{
  (e: 'remove', message: Message): Message
}>()

function removeMessage (message: Message | undefined): void {
  if (message) {
    emits('remove', message)
  }
}
</script>
