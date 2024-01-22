import axios from "axios";

export async function deleteUserService(myId: string) {
  try {
    const response  = await axios.delete(`/api/users?myId=${myId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
 export  function toggleStreamService(myId: string, stream: 'muted' | 'playing') {
  try {
    if(stream ==='muted'){
      axios.put(`/api/users?myId=${myId}&muted=${stream}`);
    }else{
      axios.put(`/api/users?myId=${myId}&playing=${stream}`);
    }
  } catch (error) {
    console.log(error);
  }
}
