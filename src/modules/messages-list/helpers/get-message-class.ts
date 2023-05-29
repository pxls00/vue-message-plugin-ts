import type { TMessageClass } from '@/modules/messages-list/components/message-item/index.types'

/* getMessageClass function gets classList, this argument maybe string or array from strings, he just returns string */
export default (classList?: TMessageClass) =>
  Array.isArray(classList) ? classList.join(' ') : classList
