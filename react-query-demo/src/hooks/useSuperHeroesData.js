import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-util";

const fetchSuperHero = ({ queryKey }) => {
	const heroId = queryKey[1];
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHero = (heroId) => {
	return useQuery(["super-hero-data", heroId], fetchSuperHero);
};

const fetchSuperHeroes = () => {
	return request({ url: "/superheroes" });
};

export const useSuperHeroesData = (onSuccess, onError) => {
	return useQuery("super-heroes", fetchSuperHeroes, {
		onSuccess,
		onError,
		// select: data => {
		//   const superHeroNames = data.data.map(hero => hero.name)
		//   return superHeroNames
		// }
	});
};

const addSuperHero = (hero) => {
	return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
	const queryClient = useQueryClient();
	return useMutation(addSuperHero, {
		// onSuccess: (response) => {
		// 	// queryClient.invalidateQueries("super-heroes");
		// 	queryClient.setQueryData("super-heroes", (oldQueryData) => {
		// 		return {
		// 			...oldQueryData,
		// 			data: [...oldQueryData.data, response.data],
		// 		};
		// 	});
		// },
		onMutate: async (newHero) => {
			await queryClient.cancelQueries("super-heroes");
			const previousHeroData = queryClient.getQueryData("super-heroes");
			queryClient.setQueryData("super-heroes", (oldQueryData) => {
				return {
					...oldQueryData,
					data: [
						...oldQueryData.data,
						{ id: oldQueryData?.data?.length + 1, ...newHero },
					],
				};
			});
			return {
				previousHeroData,
			};
		},
		onError: (_error, _hero, context) => {
			queryClient.setQueryData("super-heroes", context.previousHeroData);
		},
		onSettled: () => [queryClient.invalidateQueries("super-heroes")],
	});
};
