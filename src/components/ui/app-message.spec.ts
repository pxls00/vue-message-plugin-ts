import {mount} from '@vue/test-utils'

import AppMessage from '@/components/ui/app-message.vue'
import type Message from '@/interfaces/messages/message-item'


describe('App Message Component:', () => {
  const messageItem: Message = {
    id: 1,
    title: 'Test Message',
    type: 'success'
  }

  const wrapper = mount(AppMessage, {
    props: {
      message: messageItem
    }
  })

  it('check success action with default message data', () => {
    expect(wrapper.find('[data-testid="message__img-block"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="message__img-custom"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="message__title-content"]').text()).toBe(messageItem.title)
    expect(wrapper.find('[data-testid="message__close-button"]').html())
  })

  it('check wait action with default wait action data', () => {
    expect(wrapper.find('[data-testid="message__img-block"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="message__img-custom"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="message__title-content"]').text()).toBe(messageItem.title)
    expect(wrapper.find('[data-testid="message__close-button"]').html())
  })

  // it('check with success action with default message data', () => {
    
  // })
})