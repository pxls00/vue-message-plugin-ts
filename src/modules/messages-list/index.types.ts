// Enums
export enum EPositionMessages {
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'right-center',
  'bottom-center',
  'left-center',
}

export enum EMessageTypes {
  'error',
  'success',
  'warning',
  'custom',
  'wait',
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

export interface IMessagesOption {
  position?: keyof typeof EPositionMessages
}

export interface IMessagesPlugin {
  addNewMessage(message: IMessageBase): void
  removeMessage(id: TMessageId): void
  startWait(message?: IMessageItem): void
  stopWait(id?: TMessageId): void
}
