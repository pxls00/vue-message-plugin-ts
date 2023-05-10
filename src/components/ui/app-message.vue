<template>
  <li
    :class="[
      $style['message__item'], $style[`message__item--${props.message.type}`],
      getMessageItemClass(props.message.class || ''),
    ]"
    :data-message-type="props.message.type"
  >
    <div class="message__img">
      <slot :name="`message__img-${props.message.type}`" :item="props.message">
        <div
          v-if="!props.message.img"
          :class="
            props.message.type === 'wait'
              ? $style['message__img-wait']
              : props.message.type === 'success'
                ? $style['message__img-success']
                : props.message.type === 'error'
                  ? $style['message__img-error']
                  : props.message.type === 'warning'
                    ? $style['message__img-warning']
                    : $style['message__img-custom']
          "
        >
          {{
            props.message.type === 'success'
              ? '&#10003;'
              : props.message.type === 'warning'
                ? '!'
                : ''
          }}
        </div>
        <img
          v-else
          :src="
            typeof props.message.img === 'object'
              ? props.message.img.value
              : props.message.img
          "
          :class="[
            $style['message__img-custom'],
            typeof props.message.img === 'object'
              ? getMessageItemClass(props.message.img.class)
              : '',
          ]"
          alt="message avatar"
        >
      </slot>
    </div>
    <div :class="$style['message__title']">
      <slot
        :name="`message__title-${props.message.type}`"
        :item="{ ...props.message }"
      >
        <p
          :class="[
            $style['message__title-content'],
            typeof props.message.title === 'object'
              ? getMessageItemClass(props.message.title.class)
              : '',
          ]"
        >
          {{
            typeof props.message.title === 'object'
              ? props.message.title.value
              : props.message.title
          }}
        </p>
      </slot>
    </div>
    <button
      v-if="props.message.type !== 'wait'"
      type="button"
      :class="$style['message__close']"
      @click="removeMessage(props.message as Message)"
    >
      <slot name="message__delete-btn">
        &times;
      </slot>
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
import { useCssModule } from 'vue'

import getMessageItemClass from '@/stores/messages/helpers/get-message-class'

import type Message from '@/interfaces/messages/message-item'
import type MessageWait from '@/interfaces/messages/message-item-wait'

const $style = useCssModule()

interface IProps {
  message: Message | MessageWait
}
const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'remove', message: Message): Message
}>()

function removeMessage (message: Message): void {
  if (message && message.type !== 'wait') {
    emits('remove', message as Message)
  }
}
</script>

<style lang='scss' module>
@import './app-message';
</style>
