import { useQuery } from "react-query";
import axios from "axios";

export default function useFetchLikedImages(userId) {
	return useQuery(
		`${userId}fetchLikedImages`,
		() => {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axios.get(
						`${process.env.REACT_APP_BASE_API_URL}/app/likes/${userId}`
					);
					resolve(response.data);
				} catch (error) {
					reject(error);
				}
			});
		},
		{
			refetchOnWindowFocus: true,
			onSuccess: (data) => {},
			onError: (data) => {},
		}
	);
}
