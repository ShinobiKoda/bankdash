import {User} from '@/types/types';

export const fetchUserData = async(): Promise<User> => {
  try{
    const response = await fetch("/data.json");

    if(!response.ok){
      throw new Error("Failed to fetch User Data");
    }

    const data = await response.json();
    return data;
  }catch(error){
    console.log("Error: ", error);
    throw Error;
  }
}
