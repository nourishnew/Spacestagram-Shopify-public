import { useMutation } from "react-query";
import axios from "axios";

export default function useDislikeImage() {
  return useMutation(
    ({ userId, imageId }) => {
      return axios.delete(`${process.env.REACT_APP_BASE_API_URL}/app/like/${imageId}`, {
        data: {
          userId: userId,
        },
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
