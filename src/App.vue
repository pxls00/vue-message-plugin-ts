<template>
  <v-message>
    <template
      #message__title-custom="{
        item: {
          item: {
            body: {
              value: { title },
            },
          },
        },
      }"
    >
      <div data-testid="message-title-slot-template-html">
        {{ title }}
      </div>
    </template>
  </v-message>
  <button @click="newMessage">
    new
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { IMessagesPlugin } from '@/modules/messages-list/index.types'

const message = inject('message') as IMessagesPlugin
function newMessage() {
  message.addNewMessage({
    id: 1,
    body: {
      value: {
        title: 'Scott',
        body: 'True Alpha in beacon hills',
      },
      class: ['test_1', 'test_2'],
    },
    img: {
      value: '/public/vite.svg',
      class: ['test_1', 'test_2'],
    },
    type: 'custom',
  })
}
</script>

<style lang="scss">
body {
  background: $purple-80;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans';
}

.message__list {
  max-width: 370px;
  width: 100%;
  margin-left: auto;
  margin-top: 10px;
  margin-right: 10px;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
