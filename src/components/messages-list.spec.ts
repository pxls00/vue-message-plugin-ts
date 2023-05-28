import { mount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'
import { useMessagesStore } from '@/stores/messages'
import { nextTick } from 'vue'
import { createPinia } from 'pinia'

import MessagesList from '@/components/messages-list.vue'
import type MessageItem from '@/interfaces/messages/message-item'
import DefaultMessageWaitData from '@/constants/message-wait'

const messageList: MessageItem[] = [
  {
    id: 1,
    title: 'Success 1',
    type: 'success',
    class: ['success_1', 'success_2'],
    img: '/public/vite.svg',
  },
  {
    id: 2,
    title: 'Warning 1',
    type: 'warning',
    class: ['warning_1', 'warning_2'],
  },
  {
    id: 3,
    title: 'Error 1',
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
    const messageStore = useMessagesStore(pinia)

    messageStore.$state.isWait = false
    messageStore.$state.messages = []

    messageStore.$state.messages = messageList
    messageStore.waitAction()
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
            '[data-testid="message__img-custom"]'
          )
          const messageItemTitle = itemEl.find(
            '[data-testid="message__title-content"]'
          )

          expect(itemEl.classes()).toEqual(item.class)
          expect(messageItemTitle.exists()).toBe(true)
          expect(messageItemTitle.html()).toContain(item.title)

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
          '[data-testid="message__img-block-wait"]'
        )
        const messageItemImg = itemEl.find(
          '[data-testid="message__img-custom"]'
        )
        const messageItemTitle = itemEl.find(
          '[data-testid="message__title-content"]'
        )

        if (
          DefaultMessageWaitData.class &&
          DefaultMessageWaitData.class.length
        ) {
          expect(itemEl.classes()).toEqual(DefaultMessageWaitData.class)
        }
        expect(messageItemTitle.exists()).toBe(true)
        expect(messageItemTitle.html()).toContain(DefaultMessageWaitData.title)

        if (DefaultMessageWaitData.img) {
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
    ) as MessageItem
    const messageItem = wrapper.find(
      `[data-testid="message__item"][data-message-type="${messageErrorItem.type}"]`
    )

    const messageStore = useMessagesStore()
    const messageStoreRemoveMessageMutation = messageStore.removeMessage
    messageStore.removeMessage = jest.fn((...args) => {
      messageStoreRemoveMessageMutation.apply(messageStore, args)
    })

    const messageRemoveBtn = messageItem.find(
      '[data-testid="message__close-button"]'
    )

    messageRemoveBtn.trigger('click')

    expect(messageStore.removeMessage).toHaveBeenCalledTimes(1)
    expect(messageStore.removeMessage).toHaveBeenCalledWith(messageErrorItem)

    await nextTick()

    expect(messageStore.$state.messages.includes(messageErrorItem)).not.toBe(
      true
    )
    // expect(messageStore.$state.messages.filter(item => item.type === 'error')).toBe([])
    expect(wrapper.html()).not.toContain(messageErrorItem.title)
  })

  it('check is adding new message is working', async () => {
    const newMessage = JSON.parse(
      JSON.stringify(messageList.find((item) => item.type === 'success'))
    ) as MessageItem
    newMessage.id = 123
    newMessage.duration = 2000
    newMessage.title = 'Test success message remove after 2 seconds'

    const messageStore = useMessagesStore()
    messageStore.newMessage(newMessage)

    await nextTick()

    const messageItem = wrapper.findAll(
      `[data-testid="message__item"][data-message-type="${newMessage.type}"]`
    )

    expect(messageItem.length).toBe(2)
    expect(messageItem[1].text()).toContain(newMessage.title)

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
