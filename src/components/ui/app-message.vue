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
.message {
  &__item {
    position: relative;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    height: 50px;
    margin-bottom: 10px;
    padding-right: 30px;
    background: $white;
    &--error {
      background: $error;
    }
    &--wait {
      padding-right: 10px !important;
      background: $wait-warning;
    }
    &--success {
      background: $success;
    }
    &--warning {
      background: $wait-warning;
    }
    &--custom {
      .message__title {
        p {
          color: #000000
        }
      }
    }
  }
  &__img {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-error {
      height: 30px;
      width: 30px;
      background: $white;
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
        background: $error;
      }
      &::after {
        transform: rotate(-45deg);
      }
      &::before {
        transform: rotate(45deg);
      }
    }
    &-wait {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 16px solid $white;
        border-color: $white transparent $white transparent;
        animation: lds-hourglass 1.2s infinite;
      }
    }
    &-success {
      font-size: 24px;
      font-weight: 900;
      color: $white;
    }
    &-custom {
      border-radius: 50%;
      overflow: hidden;
    }
    &-warning {
      color: $white;
      font-size: 26px;
      font-weight: 900;
    }
  }
  &__title {
    padding: 0 10px;
    p {
      font-size: 16px;
      color: $white;
      margin: 0;
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
    color: $light-grey;
    transition: 0.2s all;
    transform: translateY(-51%);
    &:hover {
      color: $white;
    }
  }
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
