import axios from "axios";
import toast from "react-hot-toast";

export async function checkExistRoom(id: string) {
  try {
    const response  = await  axios.get(`/api/room?roomId=${id}`);
    console.log(response);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    if(error?.status === 500){
        toast.error("Room id doesn't exist");    
    }else{
        toast.error('Failed to join Room');    
    }
    return false;
  }
}

export async function getDetailRoomService(id: string) {
  try {
    const response  = await  axios.put(`/api/room?id=${id}`);
    return response?.data;
  } catch (error: any) {
    console.log(error);
  }
}