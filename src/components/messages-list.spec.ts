import {mount, type VueWrapper, type DOMWrapper} from '@vue/test-utils'
import {useMessagesStore} from '@/stores/messages'
import {defineStore} from 'pinia'

import MessagesList from '@/components/messages-list.vue'

const store = 

describe('Messages List Component:', () => {
  it('check app message components contains', () => {
    const wrapper = mount(MessagesList, {
      global: {
        plugins: [store]
      }
    })
  })
})