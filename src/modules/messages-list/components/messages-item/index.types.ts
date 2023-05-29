// Enums
enum EMessageTypes {
  'error',
  'success',
  'warning',
  'custom',
}

// Types
export type TMessageWaitType = 'wait'
export type TMessageId = number | string
export type TMessageTypes = keyof typeof EMessageTypes
export type TMessageField<T> = string | IMessageField<T>
export type TMessageClass = string | string[]

// Interfaces
export interface IMessageField<T = undefined> {
  // TODO: write true typesition for value parameter
  value: T extends undefined ? string : T
  class: TMessageClass
}

export interface IMessageBase<
  MessageBodyField = undefined,
  MessageImgField = undefined
> {
  body: TMessageField<MessageBodyField>
  type: TMessageTypes
  img?: TMessageField<MessageImgField>
  class?: TMessageClass
  key?: string
  duration?: number
}

export interface IMessageWait<
  MessageBodyField = undefined,
  MessageImgField = undefined
> {
  body: TMessageField<MessageBodyField>
  img?: TMessageField<MessageImgField>
  class?: TMessageClass
  type: TMessageWaitType
}

export interface IMessageItem extends IMessageBase {
  id: TMessageId
}
