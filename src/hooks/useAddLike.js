import { useMutation } from "react-query";
import axios from "axios";

export default function useAddLike() {
  return useMutation(
    ({ userId, imageId }) => {
      return axios.post(`${process.env.REACT_APP_BASE_API_URL}/app/like`, {
        userId,
        imageId,
      });
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
      },
    },
    {
      onError: ({ data }) => {
        console.log(data);
      },
    }
  );
}
