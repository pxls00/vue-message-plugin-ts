# vue-message-plugin-ts

A message plugin base on Vue with Typescript support

> supports only Vue 3

![Preview](/public/preview.png)

[Live Demo](https://github.com/pxls00/vue-message-plugin-ts)

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
app.use(Message as Message, options?: { position?: PositionMessages } as MessagesOption)

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

function waitAction () {
  message.waitAction()
}

function stopAction () {
  message.stopAction()
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
| addNewMessage | Adding a new message | (message: Message) ⇒ void | Message | — |
| removeMessage | Remove message by id | (id: MessageId) ⇒ void | MessageId | — |
| waitAction | Wait loader message | (message?: MessageWait) ⇒ void | MessageWait |  |
| stopAction | Stop wait loader message | () ⇒ void |  |  |

<br />

### Message for create (Message)
| Attribute | Descripttion | Type | Optional value | Default | required |
| --- | --- | --- | --- | --- | --- |
| title | Title of message | MessageItemField | any | Message | — | true |
| duration | Duration of message, if you don't add duration then you have to remove it yourself | number |  | — | false |
| type | Type of message | MessageItemType | ‘error’, ‘success’, ‘warning’, ‘custom’, ‘wait’ | — | true |
| img | Icon image of message | MessageItemField  |  | — | false |
| class | Class of message | MessageItemCLass |  | — | false |
| key?: string | Key of message | string |  | — | false |

<br />

### Message wait loader for create (MessageWait)
| Attribute | Descripttion | Type | Optional value | Default | required |
| --- | --- | --- | --- | --- | --- |
| title | Title of message | MessageItemField | any | Message | — | true |
| type | Type of message | MessageItemType | ‘wait’ | — | false |
| img | Icon image of message | MessageItemField  |  | — | false |
| class | Class of message | MessageItemCLass |  | — | false |

<br />
<br />


### Types List
- type MessageItemFIeld = string | {value: string | any, class: MessageItemClass}
- type MessageItemType = ‘error’ | ‘success’ | ‘warning’ | ‘custom’ | ‘wait’
- type MessageItemCLass = string | string[]
- type MessageId = number | string

### Template, Slot names
| Name | Descripttion | Value |
| --- | --- | --- |
| message__img-wait | Message slot name for wait messages icon image | MessageItem |
| message__img-success | Message slot name for success messages icon image | MessageItem |
| message__img-error | Message slot name for error messages icon image | MessageItem |
| message__img-warning | Message slot name for warning messages icon image | MessageItem |
| message__img-custom | Message slot name for custom messages icon image | MessageItem |
| message__title-wait | Message slot name for wait messages title | MessageItem |
| message__title-success | Message slot name for success messages title | MessageItem |
| message__title-warning | Message slot name for warning messages title | MessageItem |
| message__title-error | Message slot name for error messages title | MessageItem |
| message__title-custom | Message slot name for custom messages title | MessageItem |


## License

Licensed as [MIT](./LICENSE).
