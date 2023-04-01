import axios from 'axios';
import {API_URL} from '../ApiConfig/config';
const headers: any = {
  'Content-Type': 'application/json',
};
export const fetchChatData = async (text: string) => {
  let result = await axios.post(`${API_URL}/chat`, {text}, {headers: headers});
  return result.data;
};
