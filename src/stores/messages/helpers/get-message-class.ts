import type MessageItemClass from '@/interfaces/messages/types/message-class'

function getMessageItemClass (classList: MessageItemClass): string {
  if(Array.isArray(classList)) {
    return classList.join(' ')
  } else {
    return classList
  }
}

export default getMessageItemClass