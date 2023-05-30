import { mount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'
import MessagesList from './index.vue'
import { useMessageStore } from '@/modules/messages-list/store'
import { nextTick } from 'vue'
import { createPinia } from 'pinia'

import type { IMessageItem } from '@/modules/messages-list/index.types'
import { MESSAGE_WAIT_ACTION_CREDENTIALS } from '@/modules/messages-list/constants/default-data'

const messageList: IMessageItem[] = [
  {
    id: 1,
    body: 'Success 1',
    type: 'success',
    class: ['success_1', 'success_2'],
    img: '/public/vite.svg',
  },
  {
    id: 2,
    body: 'Warning 1',
    type: 'warning',
    class: ['warning_1', 'warning_2'],
  },
  {
    id: 3,
    body: 'Error 1',
    type: 'error',
    class: ['error_1', 'error_2'],
    img: '/public/vite.svg',
  },
]

describe('Messages List Component:', () => {
  let wrapper: VueWrapper
  let pinia: any

  beforeEach(() => {
    pinia = createPinia()
    wrapper = mount(MessagesList, {
      global: {
        plugins: [pinia],
      },
    })
    const messageStore = useMessageStore(pinia)

    messageStore.$state.messages = []

    messageStore.$state.messages = messageList
    messageStore.startWait()
  })

  it('check every message items renderable paramters is contains in html', () => {
    const messageItems: DOMWrapper<HTMLDivElement>[] = wrapper.findAll(
      '[data-testid="message__item"]'
    )
    messageItems.forEach((itemEl) => {
      messageList.find((item) => {
        if (itemEl.attributes('data-message-type') === item.type) {
          const messageItemImgBlock = itemEl.find(
            `[data-testid="message__img-block-${item.type}"]`
          )
          const messageItemImg = itemEl.find(
            `[data-testid="message__img-custom"]`
          )
          const messageItemTitle = itemEl.find(
            `[data-testid="message__title-content"]`
          )

          if (Array.isArray(item.class)) {
            item.class.forEach((item) => {
              expect(itemEl.classes()).toContain(item)
            })
          }
          expect(messageItemTitle.exists()).toBe(true)
          expect(messageItemTitle.html()).toContain(item.body)

          if (item.img) {
            expect(messageItemImgBlock.exists()).not.toBe(true)
            expect(messageItemImg.exists()).toBe(true)
          } else {
            expect(messageItemImgBlock.exists()).toBe(true)
            expect(messageItemImg.exists()).not.toBe(true)
          }
        }
      })

      if (itemEl.attributes('data-message-type') === 'wait') {
        const messageItemImgBlock = itemEl.find(
          `[data-testid="message__img-block-wait"]`
        )
        const messageItemImg = itemEl.find(
          `[data-testid="message__img-custom"]`
        )
        const messageItemTitle = itemEl.find(
          `[data-testid="message__title-content"]`
        )

        if (
          MESSAGE_WAIT_ACTION_CREDENTIALS.class &&
          MESSAGE_WAIT_ACTION_CREDENTIALS.class.length
        ) {
          if (Array.isArray(MESSAGE_WAIT_ACTION_CREDENTIALS.class)) {
            MESSAGE_WAIT_ACTION_CREDENTIALS.class.forEach((item) => {
              expect(itemEl.classes()).toContain(item)
            })
          }
        }
        expect(messageItemTitle.exists()).toBe(true)
        expect(messageItemTitle.html()).toContain(
          MESSAGE_WAIT_ACTION_CREDENTIALS.body
        )

        if (MESSAGE_WAIT_ACTION_CREDENTIALS.img) {
          expect(messageItemImgBlock.exists()).not.toBe(true)
          expect(messageItemImg.exists()).toBe(true)
        } else {
          expect(messageItemImgBlock.exists()).toBe(true)
          expect(messageItemImg.exists()).not.toBe(true)
        }
      }
    })
  })

  it('check is remove message is working', async () => {
    const messageErrorItem = messageList.find(
      (item) => item.type === 'error'
    ) as IMessageItem
    const messageItem = wrapper.find(
      `[data-testid="message__item"][data-message-type="${messageErrorItem.type}"]`
    )

    const messageStore = useMessageStore()
    const messageStoreRemoveMessageMutation = messageStore.removeMessage
    messageStore.removeMessage = jest.fn((...args) => {
      messageStoreRemoveMessageMutation.apply(messageStore, args)
    })

    const messageRemoveBtn = messageItem.find(
      '[data-testid="message__close-button"]'
    )

    messageRemoveBtn.trigger('click')

    expect(messageStore.removeMessage).toHaveBeenCalledTimes(1)
    expect(messageStore.removeMessage).toHaveBeenCalledWith(messageErrorItem.id)

    await nextTick()

    expect(messageStore.$state.messages.includes(messageErrorItem)).not.toBe(
      true
    )
    // expect(messageStore.$state.messages.filter(item => item.type === 'error')).toBe([])
    expect(wrapper.html()).not.toContain(messageErrorItem.body)
  })

  it('check is adding new message is working', async () => {
    const newMessage = JSON.parse(
      JSON.stringify(messageList.find((item) => item.type === 'success'))
    ) as IMessageItem
    newMessage.id = 123
    newMessage.duration = 2000
    newMessage.body = 'Test success message remove after 2 seconds'

    const messageStore = useMessageStore()
    messageStore.newMessage(newMessage)

    await nextTick()

    const messageItem = wrapper.findAll(
      `[data-testid="message__item"][data-message-type="${newMessage.type}"]`
    )

    expect(messageItem.length).toBe(2)
    expect(messageItem[1].text()).toContain(newMessage.body)

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, newMessage.duration)
    })

    const newMesssageItem = wrapper.findAll(
      `[data-testid="message__item"][data-message-type="${newMessage.type}"]`
    )
    expect(newMesssageItem.length).toBe(1)
    expect(
      messageStore.messages.filter((item) => item.type === newMessage.type)
        .length
    ).toBe(1)
  })
})
