<template>
  <v-message />
  <button @click="newMessage">
    Add New message
  </button>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/modules/messages-list/store/index'

const store = useMessageStore()

function newMessage() {
  store.newMessage({
    body: 'test123',
    id: Date.now(),
    class: ['asdasd'],
    type: 'custom',
    img: '/public/vite.svg',
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
