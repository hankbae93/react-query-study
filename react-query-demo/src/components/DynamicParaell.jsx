import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParaell = ({ heroIds }) => {
	const results = useQueries(
		heroIds.map((id) => {
			return {
				queryKey: ["super-hero", id],
				queryFn: () => fetchSuperHero(id),
			};
		})
	);
	console.log(results);
	return <div>DynamicParaell</div>;
};

export default DynamicParaell;
