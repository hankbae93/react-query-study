import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHero } from "../hooks/useSuperHeroesData";

const RQSuperHeroPage = () => {
	const { heroId } = useParams();

	const { isLoading, data, isError, error } = useSuperHero(heroId);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>{error.message}</p>;
	}
	console.log(data);
	return (
		<div>
			<h2>{data?.data?.name}</h2>
			<p>{data?.data?.alterEgo}</p>
		</div>
	);
};

export default RQSuperHeroPage;
