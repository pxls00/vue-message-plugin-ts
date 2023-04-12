<template>
  <app-messages />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type MessagePlugin from '@/interfaces/messages/message-plugin'

const message = inject('message') as MessagePlugin

message.waitAction()
</script>

<style scoped></style>
