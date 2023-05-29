<template>
  <li
    data-testid="message__item"
    :class="`message__item message__item--${message.type} ${getMessageClass(
      message.class
    )}`"
    :data-message-type="message.type"
  >
    <div class="message__img">
      <slot
        :name="`message__img-${message.type}`"
        :item="message"
      >
        <div
          v-if="!message.img"
          :data-testid="`message__img-block-${message.type}`"
          :class="`message__img-${message.type}`"
        >
          {{ getMessageImgBlockContent }}
        </div>
        <img
          v-else
          :src="getFieldValue(message.img)"
          :class="`message__img-custom ${getFieldClassList(message.img)}`"
          data-testid="message__img-custom"
          alt="message avatar"
        />
      </slot>
    </div>
    <div
      :class="'message__title'"
      data-testid="message__title-block"
    >
      <slot
        :name="`message__title-${message.type}`"
        :item="{ ...message }"
      >
        <p
          v-if="isShowMessageContent"
          :class="`message__title-content ${getFieldClassList(message.body)}`"
          data-testid="message__title-content"
        >
          {{ getFieldValue(message.body) }}
        </p>
      </slot>
    </div>
    <button
      v-if="message.type !== 'wait'"
      type="button"
      :class="'message__close'"
      data-testid="message__close-button"
      @click="removeMessage(message)"
    >
      <slot name="message__delete-btn">
        &times;
      </slot>
    </button>
  </li>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
