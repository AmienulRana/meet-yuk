import axios from "axios";

export function deleteUserService(myId: string) {
  try {
    axios.delete(`/api/users?myId=${myId}`);
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
