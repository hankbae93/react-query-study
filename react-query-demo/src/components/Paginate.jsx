import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (page) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};

const Paginate = () => {
	const [page, setPage] = useState(1);
	const { isLoading, isError, error, data, isFetching } = useQuery(
		["colors", page],
		() => fetchColors(page),
		{
			keepPreviousData: true,
		}
	);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}
	return (
		<div>
			<div>
				{data?.data.map((color) => {
					return (
						<div key={color.id}>
							<h2>
								{color.id}. {color.label}
							</h2>
						</div>
					);
				})}
			</div>
			<div>
				<button
					onClick={() => setPage((page) => page - 1)}
					disabled={page === 1}
				>
					Prev Page
				</button>
				<button
					onClick={() => setPage((page) => page + 1)}
					disabled={page === 4}
				>
					Next Page
				</button>
			</div>
			{/* {isFetching && "Loading"} */}
		</div>
	);
};

export default Paginate;
