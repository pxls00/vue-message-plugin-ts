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
@import 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap';

.message__list {
  &--top-right {
    right: 0;
    top: 0;
    left: auto;
    bottom: auto;
  }
  &--top-left {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto
  }
  &--bottom-right {
    bottom: 0;
    right: 0;
    top: auto;
    left: auto;
  }
  &--bottom-left {
    bottom: 0;
    left: 0;
    top: auto;
    right: auto
  }
  &--top-center {
    top: 0;
    right: 50%;
    bottom: auto;
    left: auto;
    transform: translateX(50%);
  }
  &--right-center {
    top: 50%;
    right: 0;
    left: auto;
    bottom: auto;
    transform: translateY(-50%);
  }
  &--bottom-center {
    bottom: 0;
    right: 50%;
    top: auto;
    left: auto;
    transform: translateX(50%);
  }
  &--left-center {
    top: 50%;
    left: 0;
    bottom: auto;
    right: auto;
    transform: translateY(-50%);
  }
  &--top-center {
    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateY(50%) scale(0.5);
    }
  }
  &--bottom-center {
    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateY(50%) scale(0.5);
    }
  }
  &--top-right,
  &--right-center,
  &--bottom-right {
    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(50%) scale(0.5);
    }
  }
  &--top-left,
  &--left-center,
  &--bottom-left {
    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(-50%) scale(0.5);
    }
  }
}
</style>
