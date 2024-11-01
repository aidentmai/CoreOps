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