import React from "react";
import { useParams } from "react-router-dom";
import useSuperHeroData from "../hooks/useSuperHeroData";

const RQSuperHeroPage = () => {
	const { heroId } = useParams();

	const { isLoading, data, isError, error } = useSuperHeroData(heroId);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			<h2>{data.data.name}</h2>
			<p>{data.data.alterEgo}</p>
		</div>
	);
};

export default RQSuperHeroPage;
