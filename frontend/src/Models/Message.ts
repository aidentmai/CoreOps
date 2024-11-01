export type Message = {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    timeStamp: string;
    chatRoomId: string;
    sender: string;
    receiver: string;
    seen?: boolean;
}