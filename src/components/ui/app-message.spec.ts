import { mount, type VueWrapper, type DOMWrapper } from '@vue/test-utils'

import AppMessage from '@/components/ui/app-message.vue'
import type Message from '@/interfaces/messages/message-item'
import type MessageWait from '@/interfaces/messages/message-item-wait'

describe('App Message Component:', () => {
  it('check success action with default message data', async () => {
    /* 
      Message Item with default data, message has type: success
    */
    const messageItem: Message = {
      id: 1,
      title: 'Test Message',
      type: 'success',
    }

    /* 
      Mount Component and create VueWrapper
    */
    const wrapper: VueWrapper<any> = mount(AppMessage as any, {
      props: {
        message: messageItem,
      },
    })

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
    expect(messageTitleContent.text()).toBe(messageItem.title)
    expect(messageButton.exists()).toBe(true)

    await messageButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('remove')

    const removeEvent = wrapper.emitted('remove')

    expect(removeEvent).toHaveLength(1)

    if (removeEvent && removeEvent.length) {
      expect(removeEvent[0][0]).toEqual(messageItem)
    }
  })

  it('check wait action with title.value and title.class data', () => {
    /* 
      Message Item with default data, message has type: wait
    */
    const messageItem: MessageWait = {
      title: {
        value: 'Wait action...',
        class: ['test_1', 'test_2'],
      },
      type: 'wait',
    }

    /* 
      Mount Component and create VueWrapper
    */
    const wrapper: VueWrapper<any> = mount(AppMessage as any, {
      props: {
        message: messageItem,
      },
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
    expect(messageTitleContent.text()).toBe(messageItem.title.value)
    expect(messageTitleContent.classes()).toEqual(messageItem.title.class)
    expect(messageButton.exists()).not.toBe(true)
  })

  it('check component slots with custom message data', async () => {
    /* 
      Message Item with default data, message has type: success
    */
    const messageItem: Message = {
      id: 1,
      title: {
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
    const wrapper: VueWrapper<any> = mount(AppMessage as any, {
      props: {
        message: messageItem,
      },
      slots: {
        'message__title-custom': `
          <template #message__title-custom="{item: {title: {value :{title}}}}">
            <div data-testid="message-title-slot-template-html">{{title}}</div>
          </template>
        `,
      },
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
      expect(messageImgEl.classes()).toEqual(messageItem.img.class)
    }
    expect(messageTitleContent.exists()).not.toBe(true)
    expect(messageTitleSlotTemplateContent.html()).toContain(
      messageItem.title.value.title
    )
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
