import useSuperHeroes from "../hooks/useSuperHeroes";

const RQSuperHeroesPage = () => {
	const { data } = useSuperHeroes();

	return (
		<>
			<h2>Super Heroes Page</h2>
			{data?.data.map((hero) => {
				return <div key={hero.name}>{hero.name}</div>;
			})}
		</>
	);
};

export default RQSuperHeroesPage;
