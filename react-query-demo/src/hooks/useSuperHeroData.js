/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = ({ queryKey }) => {
	const heroId = queryKey[1];
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default (heroId) => {
	return useQuery(["super-hero-data", heroId], fetchSuperHeroes);
};
