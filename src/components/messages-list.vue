<template>
  <TransitionGroup name="list" tag="ul" class="message__list">
    <AppMessage v-if="wait" :message="MESSAGE_WAIT_ACTION_CREDENTIALS">
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

import AppMessage from '@/components/ui/app-message.vue'
import MESSAGE_WAIT_ACTION_CREDENTIALS from '@/constants/message-wait'

import type Message from '@/interfaces/messages/message-item'

const store = useMessagesStore()

const { messages, wait } = storeToRefs(store)

function removeMessage (message: Message): void {
  store.removeMessage(message)
}

</script>
