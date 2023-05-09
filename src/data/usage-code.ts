import type CodeItem from '@/interfaces/code-item'

const code: CodeItem = {
  script: `// InYourComponent.vue (composition-api)

import { inject } from 'vue'

const message = inject('message')

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
}`,

  template: '',

  style: '',
}

export default code
