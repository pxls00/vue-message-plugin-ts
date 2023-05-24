import {mount, type VueWrapper, type DOMWrapper} from '@vue/test-utils'
import { useMessagesStore } from '@/stores/messages'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

import MessagesList from '@/components/messages-list.vue'
import AppMessageComponent from '@/components/ui/app-message.vue'
import type MessageItem from '@/interfaces/messages/message-item'
import DefaultMessageWaitData from '@/constants/message-wait'

const messageList: MessageItem[] = [
  {
    id: 1,
    title: 'Success 1',
    type: 'success',
    class: [
      'success_1', 'success_2'
    ],
    img: '/public/vite.svg',
  },
  {
    id: 2,
    title: 'Warning 1',
    type: 'warning',
    class: [
      'warning_1', 'warning_2'
    ],
  },
  {
    id: 3,
    title: 'Error 1',
    type: 'error',
    class: [
      'error_1', 'error_2'
    ],
    img: '/public/vite.svg'
  },
]

describe('Messages List Component:', () => {
  let wrapper: VueWrapper
  let store : any

  beforeAll(() => {
    wrapper = mount(MessagesList, {
      global: {
        plugins:[createTestingPinia()]
      }
    })
    store = useMessagesStore()
    store.$patch({messages: messageList})
    store.waitAction()
  })

  it('check every message items renderable paramters is contains in html', () => {
    const messageItems: DOMWrapper<HTMLDivElement>[] = wrapper.findAll('[data-testid="message__item"]')
    messageItems.forEach(itemEl => {
      messageList.find(item => {
        if(itemEl.attributes('data-message-type') === item.type) {
          const messageItemImgBlock = itemEl.find(`[data-testid="message__img-block-${item.type}"]`)
          const messageItemImg = itemEl.find(`[data-testid="message__img-custom"]`)
          const messageItemTitle = itemEl.find(`[data-testid="message__title-content"]`)

          expect(itemEl.classes()).toEqual(item.class)
          expect(messageItemTitle.exists()).toBe(true)
          expect(messageItemTitle.html()).toContain(item.title)

          if(item.img) {
            expect(messageItemImgBlock.exists()).not.toBe(true)
            expect(messageItemImg.exists()).toBe(true)
          }else {
            expect(messageItemImgBlock.exists()).toBe(true)
            expect(messageItemImg.exists()).not.toBe(true)
          }
        }
      })
      if(itemEl.attributes('data-message-type') === 'wait') {
        const messageItemImgBlock = itemEl.find(`[data-testid="message__img-block-wait"]`)
        const messageItemImg = itemEl.find(`[data-testid="message__img-custom"]`)
        const messageItemTitle = itemEl.find(`[data-testid="message__title-content"]`)

        expect(itemEl.classes()).toEqual(DefaultMessageWaitData.class)
        expect(messageItemTitle.exists()).toBe(true)
        expect(messageItemTitle.html()).toContain(DefaultMessageWaitData.title)

        if(DefaultMessageWaitData.img) {
          expect(messageItemImgBlock.exists()).not.toBe(true)
          expect(messageItemImg.exists()).toBe(true)
        }else {
          expect(messageItemImgBlock.exists()).toBe(true)
          expect(messageItemImg.exists()).not.toBe(true)
        }
      }
    })
  })
  it('check is remove message is works', async () => {
    const messageErrorItem = messageList.find(item => item.type === 'error') as MessageItem
    const messageItem = wrapper.find(`[data-testid="message__item"][data-message-type="${messageErrorItem.type}"]`)

    const removeMessageMutation = jest.fn()
    
    store.removeMessage = removeMessageMutation

    const messageRemoveBtn = messageItem.find('[data-testid="message__close-button"]')

    messageRemoveBtn.trigger('click')

    expect(removeMessageMutation).toHaveBeenCalled()
    expect(store.messages.includes(messageErrorItem)).not.toBe(true)

    await nextTick()

    expect(wrapper.html()).not.toContain(messageErrorItem.title)
    // await expect(wrapper.html()).not.toContain(messageErrorItem.title)
  })
})