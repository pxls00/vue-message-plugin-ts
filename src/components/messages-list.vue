<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="message__list"
  >
    <AppMessage v-if="wait">
      <template v-for="(_, slot) in $slots" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </AppMessage>
    <AppMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @remove="removeMessage"
    >
      <template v-for="(_, slot) in $slots" #[slot]="data">
        <slot :name="slot" :item="{...data}"></slot>
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
import type Message from '@/interfaces/messages/message-item'
import AppMessage from '@/components/ui/app-message.vue'

const store = useMessagesStore()

const { messages, wait } = storeToRefs(store)

function removeMessage (message: Message): void {
  store.removeMessage(message)
}
</script>

<style lang="scss">
@import 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap';


.message__item {
  position: relative;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 50px;
  padding-right: 30px;
  &.error {
    background: rgb(210, 10, 10);
  }
  &.wait {
    padding-right: 10px !important;
    background: rgb(201, 198, 20);
  }
  &.success {
    background: rgb(75, 170, 30);
  }
  &.warning {
    background: rgb(201, 198, 20);
  }
  &__title {
    p {
      font-family: 'Noto Sans';
      font-size: 16px;
      color: rgb(255, 255, 255);
      padding: 0 10px;
      margin: 0;
    }
  }
  &__warning {
    color: rgb(255, 255, 255);
    font-size: 26px;
    font-weight: 900;
    font-family: 'Noto Sans';
  }
  &__tick {
    font-size: 24px;
    font-weight: 900;
    color: rgb(255, 255, 255);
  }
  &__error {
    height: 30px;
    width: 30px;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after,
    &::before {
      content: '';
      height: 24px;
      width: 3px;
      border-radius: 5px;
      position: absolute;
      background: rgb(210, 10, 10);
    }
    &::after {
      transform: rotate(-45deg);
    }
    &::before {
      transform: rotate(45deg);
    }
  }
  &__close {
    outline: none;
    border: none;
    background: none;
    font-size: 24px;
    font-family: 'Noto Sans';
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    color: rgba(195, 195, 195);
    transition: 0.2s all;
    transform: translateY(-51%);
    &:hover {
      color: rgb(255, 255, 255);
    }
  }

  &__icon {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.lds-hourglass {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 16px solid white;
  border-color: white transparent white transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
