import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";

import DependentPage from "./pages/Dependent.page";
import PharelledQueryPage from "./pages/PharelledQuery.page";
import DynamicParaellPage from "./pages/DynamicParaell.page";
import HomePage from "./pages/Home.page";
import InfinitePage from "./pages/Infinite.page";
import PaginatePage from "./pages/Paginate.page";
import RQSuperHeroPage from "./pages/RQSuperHero.page";
import RQSuperHeroesPage from "./pages/RQSuperHeroes.page";
import SuperHerosPage from "./pages/SuperHeroes.page";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/super-heroes'>Traditional Super Heroes</Link>
							</li>
							<li>
								<Link to='/rq-super-heroes'>RQ Super Heroes</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route path='/rq-super-heroes/:heroId'>
							<RQSuperHeroPage />
						</Route>
						<Route path='/rq-super-heroes'>
							<RQSuperHeroesPage />
						</Route>
						<Route path='/super-heroes'>
							<SuperHerosPage />
						</Route>

						<Route path='/rq-parallel'>
							<PharelledQueryPage />
						</Route>
						<Route path='/rq-dynamic-parallel'>
							<DynamicParaellPage heroIds={[1, 3]} />
						</Route>
						<Route path='/rq-dependent'>
							<DependentPage email='vishwas@example.com' />
						</Route>
						<Route path='/rq-paginated'>
							<PaginatePage />
						</Route>
						<Route path='/rq-infinite'>
							<InfinitePage />
						</Route>
						<Route path='/'>
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	);
}

export default App;
