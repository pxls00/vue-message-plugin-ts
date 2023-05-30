import { mount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'

import AppMessage from './index.vue'
import type { IMessageItem } from '@/modules/messages-list/index.types'

describe('App Message Component:', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    const messageItem: IMessageItem = {
      id: 1,
      body: 'Test Message',
      type: 'success',
    }
    wrapper = mount(AppMessage, {
      props: {
        message: messageItem,
      },
      slots: {
        'message__title-custom': `
          <template #message__title-custom="{item: {body:{value: {title}}}}">
            <div data-testid="message-title-slot-template-html">{{title}}</div>
          </template>
        `,
      },
    })
  })

  it('check success action with default message data', async () => {
    /* 
      Message Item with default data, message has type: success
    */
    const messageItem: IMessageItem = {
      id: 1,
      body: 'Test Message',
      type: 'success',
    }
    /* 
      Mount Component and create VueWrapper
    */
    await wrapper.setProps({ message: messageItem })

    /* 
      Elements initialization by data-testid
    */
    const messageImgBlock: DOMWrapper<HTMLDivElement> = wrapper.find(
      `[data-testid="message__img-block-${messageItem.type}"]`
    )
    const messageImgEl: DOMWrapper<HTMLImageElement> = wrapper.find(
      '[data-testid="message__img-custom"]'
    )
    const messageTitleContent: DOMWrapper<HTMLParagraphElement> = wrapper.find(
      '[data-testid="message__title-content"]'
    )
    const messageButton: DOMWrapper<HTMLButtonElement> = wrapper.find(
      '[data-testid="message__close-button"]'
    )

    /*
      CHECK LIST

      Expects: matching by certain condition and value:
      [
        0: check is messageImgBlock exists in DOM: ✔
        1: check is messageImgEl doesn't exists in DOM: ✘
        2: check is messageTitleContent exists in DOM: ✔
        2: check is messageTitleContent's innerHTML is identical with messageItem.title in DOM: ✔
        2: check is messageButton exists in DOM: ✔
      ]
      Check emit:
      [
        0: click to messageButton: ✔
        1: check is remove emitEvent exists in wrapper.emitted list: ✔
        2: check is remove event emited only 1 times
        3: check is removeEvent value identical with messageItem
      ]
    */
    expect(messageImgBlock.exists()).toBe(true)
    expect(messageImgEl.exists()).toBe(false)
    expect(messageTitleContent.exists()).toBe(true)
    expect(messageTitleContent.text()).toBe(messageItem.body)
    expect(messageButton.exists()).toBe(true)

    await messageButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('remove')

    const removeEvent = wrapper.emitted('remove')

    expect(removeEvent).toHaveLength(1)

    if (removeEvent && removeEvent.length) {
      expect(removeEvent[0][0]).toEqual(messageItem)
    }
  })

  it('check wait action with body.value and title.class data', async () => {
    /* 
      Message Item with default data, message has type: wait
    */
    const messageItem: IMessageItem = {
      body: {
        value: 'Wait action...',
        class: ['test_1', 'test_2'],
      },
      id: 'default',
      type: 'wait',
    }

    /* 
      Mount Component and create VueWrapper
    */
    await wrapper.setProps({ message: messageItem })

    /* 
      Elements initialization by data-testid
    */
    const messageImgBlock = wrapper.find(
      `[data-testid="message__img-block-${messageItem.type}"]`
    )
    const messageImgEl = wrapper.find('[data-testid="message__img-custom"]')
    const messageTitleContent = wrapper.find(
      '[data-testid="message__title-content"]'
    )
    const messageButton = wrapper.find('[data-testid="message__close-button"]')

    /*
      CHECK LIST

      Expects: matching by certain condition and value:
      [
        0: check is messageImgBlock exists in DOM: ✔
        1: check is messageImgEl doesn't exists in DOM: ✘
        2: check is messageTitleContent exists in DOM: ✔
        2: check is messageTitleContent's innerHTML is identical with messageItem.title.value in DOM: ✔
        2: check is messageTitleContent's classlist should include class list of messageItem.title.class: ✔
        2: check is messageButton doesn't exists in DOM: ✘
      ]
    */
    expect(messageImgBlock.exists()).toBe(true)
    expect(messageImgEl.exists()).not.toBe(true)
    expect(messageTitleContent.exists()).toBe(true)
    if (typeof messageItem.body === 'object') {
      expect(messageTitleContent.text()).toBe(messageItem.body.value)
      if (Array.isArray(messageItem.body.class)) {
        messageItem.body.class.forEach((item) => {
          expect(messageTitleContent.classes()).toContain(item)
        })
      }
    }
    expect(messageButton.exists()).not.toBe(true)
  })

  it('check component slots with custom message data', async () => {
    /* 
      Message Item with default data, message has type: success
    */
    const messageItem: IMessageItem<{ title: string; body: string }> = {
      id: 1,
      body: {
        value: {
          title: 'Scott',
          body: 'True Alpha in beacon hills',
        },
        class: ['test_1', 'test_2'],
      },
      img: {
        value: '/public/vite.svg',
        class: ['test_1', 'test_2'],
      },
      type: 'custom',
    }

    /* 
      Mount Component and create VueWrapper
    */
    await wrapper.setProps({
      message: messageItem,
    })

    /* 
      Elements initialization by data-testid
    */
    const messageImgBlock = wrapper.find(
      `[data-testid="message__img-block-${messageItem.type}"]`
    )
    const messageImgEl = wrapper.find('[data-testid="message__img-custom"]')
    const messageTitleContent = wrapper.find(
      '[data-testid="message__title-content"]'
    )
    const messageButton = wrapper.find('[data-testid="message__close-button"]')
    const messageTitleSlotTemplateContent = wrapper.find(
      '[data-testid="message-title-slot-template-html"]'
    )

    /*
      CHECK LIST

      Expects: matching by certain condition and value:
      [
        0: check is messageImgBlock doesn't exists in DOM: ✔
        1: check is messageImgEl exists in DOM: ✘
        1: check is messageImgEl classlist should include class list of messageItem.img.class: ✔
        2: check is messageTitleContent doesn't exists in DOM: ✔
        3: check is messageTitleSlotTemplateContent's html contains with messageItem.title.value.title in DOM: ✔
        4: check is messageButton exists in DOM: ✔
      ]
      Check emit:
      [
        0: click to messageButton: ✔
        1: check is remove emitEvent exists in wrapper.emitted list: ✔
        2: check is remove event emited only 1 times
        3: check is removeEvent value identical with messageItem
      ]
    */
    expect(messageImgBlock.exists()).not.toBe(true)
    expect(messageImgEl.exists()).toBe(true)
    if (messageItem.img && typeof messageItem.img === 'object') {
      if (Array.isArray(messageItem.img.class)) {
        messageItem.img.class.forEach((item) => {
          expect(messageImgEl.classes()).toContain(item)
        })
      }
    }
    expect(messageTitleContent.exists()).not.toBe(true)
    if (typeof messageItem.body === 'object') {
      expect(messageTitleSlotTemplateContent.html()).toContain(
        messageItem.body.value.title
      )
    }
    expect(messageButton.exists()).toBe(true)

    await messageButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('remove')

    const removeEvent = wrapper.emitted('remove')

    expect(removeEvent).toHaveLength(1)

    if (removeEvent && removeEvent.length) {
      expect(removeEvent[0][0]).toEqual(messageItem)
    }
  })
})
