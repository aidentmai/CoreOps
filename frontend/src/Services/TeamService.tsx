import axios from "axios";
import { GetTeam } from "../Models/Team";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5295/api/team/";

export const GetTeamsAPI = async () => {
    try {
        const data = await axios.get<GetTeam[]>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
}