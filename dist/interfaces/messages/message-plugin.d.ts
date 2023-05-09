import type NewMessageItem from '@/interfaces/messages/message-item-base';
import type MessageItem from '@/interfaces/messages/message-item';
import type MessageItemWait from '@/interfaces/messages/message-item-wait';
interface Messages {
    addNewMessage(message: NewMessageItem): void;
    removeMessage(message: MessageItem): void;
    waitAction(message?: MessageItemWait): void;
    stopAction(): void;
}
export default Messages;
//# sourceMappingURL=message-plugin.d.ts.map