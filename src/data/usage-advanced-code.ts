import type CodeItem from '@/interfaces/code-item'

const code: CodeItem = {
  script: `// InYourComponent.vue (composition-api)

import { inject } from 'vue'

const message = inject('message')

function customMessage () {
  message.addNewMessage({
    title: {
      value: {
        title: 'Scott',
        body: "I'm Alfa in wolfpack"
      },
      class: ['custom-profile']
    },
    type: 'custom',
    duration: 5000,
    key: 'acccount'
  })
}`,

  template: `// App.vue

<template>
  <app-messages>
    <template #message__title-custom="{item: {item}}">
      <div class="account">
        <h3 class="account-title">
          {{item.title.value.title}}
        </h3>
        <p class="account-body">
          {{item.title.value.body}}
        </p>
      </div>
    </template>
  </app-messages>
  <router-view />
</template>`,

  style: ''
}

export default code