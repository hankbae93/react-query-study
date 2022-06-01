import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import DynamicParaell from "./DynamicParaell";

const fetchSuperHeroes = () => {
	return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
	return axios.get("http://localhost:4000/friends");
};

const PharelledQueryPage = () => {
	const { data: superheroesData } = useQuery("super-heroes", fetchSuperHeroes);
	const { data: friendsData } = useQuery("friends", fetchFriends);

	return (
		<div>
			PharelledQueryPage
			<div>
				{superheroesData && (
					<DynamicParaell heroIds={superheroesData.data.map((v) => v.id)} />
				)}
			</div>
		</div>
	);
};

export default PharelledQueryPage;
