# vue-message-plugin-ts

A message plugin base on Vue with Typescript support

> supports only Vue 3

![Preview](https://github.com/pxls00/vue-message-plugin-ts/blob/master/preview.png)

[Docs page | Live Demo](https://vue-message-plugin-205f7.web.app/)

## Installation

you can install the package yarn:

```bash
yarn add vue-message-plugin-ts
```

or npm:

```bash
npm i vue-message-plugin-ts
```

## Register Plugin

```js
import { createApp, h } from 'vue'
import Message from 'vue-message-plugin-ts'
import 'vue-message-plugin-ts/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(Message)
// or
app.use(Message, options?: { position?: IMessagesOption } as IMessagesOption)

app.mount('#app')
```

## Usage

```js
// App.vue
<template>
  <app-messages />
  <component :is="layoutName">
    <RouterView />
  </component>
</template>
```

Usage in components

```js
// Component.vue
<script lang="ts" setup>
import { inject } from 'vue'

const message = inject('message')

function errorAction () {
  message.addNewMessage({
    title: 'Action error',
    type: 'error',
    duration: 5000,
  })
}

function startWait () {
  message.startWait()
}

function stopWait () {
  message.stopWait()
}

</script>
```


## Messages API
### MessagesOption
| Attribute | Descripttion | Type | Optional value | Default |
| --- | --- | --- | --- | --- |
| position | Messages display position | string | ‘top-left’, ‘top-center’, ‘top-right’, ‘right-center’, ‘bottom-right’, ‘botom-center’, ‘bottom-left’, ‘left-center’ | ‘top-right’ |

<br />

### Messages
| Attribute | Descripttion | Type | Optional value | Default |
| --- | --- | --- | --- | --- |
| addNewMessage | Adding a new message | (message: IMessageItem) ⇒ void | IMessageItem | — |
| removeMessage | Remove message by id | (id: TMessageId) ⇒ void | TMessageId | — |
| startWait | Wait loader message | (message?: IMessageItem) ⇒ void | IMessageItem |  |
| stopWait | Stop wait loader message | (id?: TMessageId) ⇒ void | TMessageId |  |

<br />

### Message for create (Message)
| Attribute | Descripttion | Type | Optional value | Default | required |
| --- | --- | --- | --- | --- | --- |
| body | Body of message | TMessageField<T> | — | — | — | true |
| duration | Duration of message, if you don't add duration then you have to remove it yourself | number | — | — | false |
| type | Type of message | TMessageTypes | ‘error’, ‘success’, ‘warning’, ‘custom’, ‘wait’ | — | true |
| img | Icon image of message | TMessageField  | — | — | false |
| class | Class of message | TMessageClass | — | — | false |
| key?: string | Key of message | string | — | — | false |

<br />
<br />


### Types List
- type TMessageField = string | {value: string | any, class: TMessageClass}
- type TMessageTypes = ‘error’ | ‘success’ | ‘warning’ | ‘custom’ | ‘wait’
- type TMessageClass = string | string[]
- type TMessageId = number | string

### Template, Slot names
| Name | Descripttion | Value |
| --- | --- | --- |
| message__img-wait | Message slot name for wait messages icon image | IMessageItem |
| message__img-success | Message slot name for success messages icon image | IMessageItem |
| message__img-error | Message slot name for error messages icon image | IMessageItem |
| message__img-warning | Message slot name for warning messages icon image | IMessageItem |
| message__img-custom | Message slot name for custom messages icon image | IMessageItem |
| message__title-wait | Message slot name for wait messages title | IMessageItem |
| message__title-success | Message slot name for success messages title | IMessageItem |
| message__title-warning | Message slot name for warning messages title | IMessageItem |
| message__title-error | Message slot name for error messages title | IMessageItem |
| message__title-custom | Message slot name for custom messages title | IMessageItem |


## License

Licensed as [MIT](https://github.com/pxls00/vue-message-plugin-ts/blob/master/LICENSE).
