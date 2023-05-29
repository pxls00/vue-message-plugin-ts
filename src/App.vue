<template>
  <MessagesListModule.MessagesList />
  <button @click="newMessage">Add New message</button>
</template>

<script setup lang="ts">
import MessagesListModule from './modules/messages-list';
import {useMessageStore} from '@/modules/messages-list/store/index'

const store = useMessageStore()

function newMessage() {
  store.newMessage({
    body: 'test123',
    id: 123,
    class: ['asdasd'],
    type: 'success',
    duration: 2000
  })
}
</script>

<style lang="scss"></style>
