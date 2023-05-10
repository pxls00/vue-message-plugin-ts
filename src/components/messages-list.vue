<template>
  <TransitionGroup
    name="list"
    tag="ul"
    :class="[$style['message__list'], `message__list--${position}`]"
  >
    <AppMessage v-if="isWait" :message="messageWait">
      <template v-for="(_, slot) in $slots" #[slot]>
        <slot :name="slot" />
      </template>
    </AppMessage>
    <AppMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @remove="removeMessage"
    >
      <template v-for="(_, slot) in $slots" #[slot]="data">
        <slot :name="slot" :item="{ ...data }" />
      </template>
    </AppMessage>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessagesHandleComponent',
})
</script>

<script lang="ts" setup>
import { useMessagesStore } from '@/stores/messages'
import { storeToRefs } from 'pinia'
import { computed, useCssModule } from 'vue'

import AppMessage from '@/components/ui/app-message.vue'

import MESSAGE_WAIT_ACTION_CREDENTIALS from '@/constants/message-wait'

import type MessageWait from '@/interfaces/messages/message-item-wait'
import type Message from '@/interfaces/messages/message-item'

const $style = useCssModule()

const store = useMessagesStore()

const { messages, wait, position, isWait } = storeToRefs(store)

const messageWait = computed<MessageWait>(() => {
  if (wait.value) {
    return wait.value
  }
  return MESSAGE_WAIT_ACTION_CREDENTIALS
})

function removeMessage (message: Message): void {
  store.removeMessage(message)
}
</script>


<style lang="scss" module>
.message__list {
  list-style: none;
  max-width: 370px;
  width: 100%;
  margin: 10px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>

<style lang="scss">
@import './messages-list.scss';
</style>
