import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
	return axios.get("http://localhost:4000/superheroes");
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default () => {
	return useQuery("super-heroes", fetchSuperHeroes);
};
