export declare enum EPositionMessages {
    'top-left' = 0,
    'top-right' = 1,
    'bottom-left' = 2,
    'bottom-right' = 3,
    'top-center' = 4,
    'right-center' = 5,
    'bottom-center' = 6,
    'left-center' = 7
}
export declare enum EMessageTypes {
    'error' = 0,
    'success' = 1,
    'warning' = 2,
    'custom' = 3,
    'wait' = 4
}
export type TMessageId = number | string;
export type TMessageTypes = keyof typeof EMessageTypes;
export type TMessageField<T> = string | IMessageField<T>;
export type TMessageClass = string | string[];
export interface IMessageField<T = undefined> {
    value: T extends undefined ? string : T;
    class: TMessageClass;
}
export interface IMessageBase<MessageBodyField = undefined, MessageImgField = undefined> {
    body: TMessageField<MessageBodyField>;
    type: TMessageTypes;
    img?: TMessageField<MessageImgField>;
    class?: TMessageClass;
    key?: string;
    duration?: number;
}
export interface IMessageItem<MessageBodyField = undefined, MessageImgField = undefined> extends IMessageBase<MessageBodyField, MessageImgField> {
    id: TMessageId;
}
export interface IMessagesOption {
    position?: keyof typeof EPositionMessages;
}
export interface IMessagesPlugin {
    addNewMessage(message: IMessageBase): void;
    removeMessage(id: TMessageId): void;
    startWait(message?: IMessageItem): void;
    stopWait(id?: TMessageId): void;
}
//# sourceMappingURL=index.types.d.ts.map