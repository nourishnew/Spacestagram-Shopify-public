import { useMutation } from "react-query";
import axios from "axios";

export default function useLoginUser() {
	return useMutation(
		({ name }) => {
			return axios.post(`${process.env.REACT_APP_BASE_API_URL}/app/user/login`, {
				name,
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		}
	);
}
