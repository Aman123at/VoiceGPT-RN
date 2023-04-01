import axios from 'axios';
import {API_URL} from '../ApiConfig/config';
const headers: any = {
  'Content-Type': 'application/json',
};
export const fetchImageData = async (text: string) => {
  let result = await axios.post(
    `${API_URL}/images`,
    {text},
    {headers: headers},
  );
  return result.data;
};
export const downloadImageData = async (url: string) => {
  let result = await axios.get(`${API_URL}/img/download?imgUrl=${url}`, {
    headers: headers,
  });
  return result.data;
};
