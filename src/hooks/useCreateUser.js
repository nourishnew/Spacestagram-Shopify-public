import { useMutation } from "react-query";
import axios from "axios";

export default function useCreateUser() {
	const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
	return useMutation(
		({ name }) => {
			return axios.post(`${process.env.REACT_APP_BASE_API_URL}/app/user/signup`, {
				name,
				id,
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		}
	);
}
