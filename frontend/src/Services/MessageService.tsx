import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Message } from "../Models/Message";

const api = "http://localhost:5295/api/message/";

export const fetchMessagesAPI = async (chatRoomId: string): Promise<Message[]> => {
    try {
        const response = await axios.get<Message[]>(`${api}${chatRoomId}`);
        return response.data;
    } catch (error) {
        handleError(error);
        return [];
    }
}

export const fetchUnreadMessagesAPI = async (user: { id: string }) => {
    try {
        const response = await axios.get(`${api}unread-messages?userId=${user.id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        handleError(error);
    }
}