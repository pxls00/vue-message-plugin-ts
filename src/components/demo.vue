<template>
  <div class="btn-wrapper">
    <button
      type="button"
      class="button button--wait-warning"
      @click="waitAction"
    >
      Wait Action
    </button>
    <button
      type="button"
      class="button button--wait-warning"
      @click="stopWaitAction"
    >
      Stop Wait Action
    </button>
    <button type="button" class="button button--success" @click="successAction">
      Success Action
    </button>
    <button type="button" class="button button--error" @click="errorAction">
      Error Action
    </button>
    <button
      type="button"
      class="button button--wait-warning"
      @click="warningAction"
    >
      Warning Action
    </button>
    <button type="button" class="button" @click="randomAction">
      Random Action
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DemoComponent',
})
</script>

<script lang="ts" setup>
import { inject } from 'vue'

import type MessagePlugin from 'vue-message-plugin-ts/dist/interfaces/messages/message-plugin'

const message = inject('message') as MessagePlugin

function waitAction () {
  message.waitAction({
    title: 'Wait please your action ...',
    class: 'wait__actions',
  })
}
function stopWaitAction () {
  message.stopAction()
}
function successAction () {
  message.addNewMessage({
    title: {
      value: 'Action success',
      class: 'success__title-test',
    },
    type: 'success',
    class: 'succes__test',
  })
}
function errorAction () {
  message.addNewMessage({
    title: 'Action error',
    type: 'error',
    duration: 5000,
  })
}
function warningAction () {
  message.addNewMessage({
    title: 'Action error',
    type: 'warning',
    duration: 5000,
  })
}
function randomAction () {
  message.addNewMessage({
    title: {
      value: {
        title: 'Scott',
        body: 'I\'m Alfa in wolfpack',
      },
      class: ['custom-profile'],
    },
    type: 'custom',
    img: '/favicon.ico',
    key: 'account',
  })
}
</script>
