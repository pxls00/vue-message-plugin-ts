<template>
  <TransitionGroup
    name="list"
    tag="ul"
    :class="['message__list', `message__list--${position}`]"
  >
    <MessageItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @remove="removeMessage"
    >
      <template
        v-for="(_, slot) in $slots"
        #[slot]="data"
      >
        <slot
          :name="slot"
          :item="{ ...data }"
        ></slot>
      </template>
    </MessageItem>
  </TransitionGroup>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped lang="scss" src="./index.scss"></style>
