import axios from "axios";


type TPostChat = {
    roomId:string;
    userId: string;
    message: string;
}

export async function addChatService({roomId, userId, message}: TPostChat){
    try {
        const response  = await axios.post('/api/chats', {roomId, myId:userId, message});
        console.log(response); 
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getChatService(roomId: string){
    try {
        const response  = await axios.get(`/api/chats?roomId=${roomId}`);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}