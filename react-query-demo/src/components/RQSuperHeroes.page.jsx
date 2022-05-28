import { Link } from "react-router-dom";
import useSuperHeroes from "../hooks/useSuperHeroes";

const RQSuperHeroesPage = () => {
	const { data } = useSuperHeroes();

	return (
		<>
			<h2>Super Heroes Page</h2>
			{data?.data.map((hero) => {
				return (
					<Link to={`/rq-super-heroes/${hero.id}`}>
						<div key={hero.name}>{hero.name}</div>
					</Link>
				);
			})}
		</>
	);
};

export default RQSuperHeroesPage;
