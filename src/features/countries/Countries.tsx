import {
	Button,
	Grid,
	Pagination
} from "@mui/material";
import {
	useCallback,
	useEffect,
	useState
} from "react";
import Country from "./parts/Country";

export type TypeCountry = {
	name: {
		common: string;
		official: string;
	};
	flags: {
		png: string;
	};
	unMember: boolean;
	population: number;
	area: number;
}

const Countries = () => {

	const [countries, setCountries] = useState<TypeCountry[]>([]);
	const [recentCountries, setRecentCountries] = useState<TypeCountry[]>([]);
	const [page, setPage] = useState(1);  // Initial page
	const [totalPages, setTotalPages] = useState(1);
	const [recentViewCount, setRecentViewCount] = useState(0);

	const pageSize = 10;  // Items per page

	useEffect(() => {
		onMount();
	}, [page, recentViewCount]);

	const onMount = useCallback(async () => {
		try {
			const response = await fetch(`https://restcountries.com/v3.1/all`);
			const data = await response.json();
			setTotalPages(data.length / 10);

			if (page === 1) {
				setCountries(data.slice(0, 10))
			} else {
				setCountries(data.slice((pageSize * page) - 10, pageSize * page));
			}

			const values = Object.values(localStorage).map(value => JSON.parse(value));
			setRecentCountries(values);
		} catch (error) {
			console.log("Exception", error);
		}
	}, [page]);

	const handlePageChange = useCallback((event, value) => {
		setPage(value);
	}, []);

	const handleLocalStorageClear = useCallback(() => {
		// console.log({ x: x});
		localStorage.clear();
		setRecentViewCount(0);
	}, []);

	return (
		<div className="container ">
			{
				countries.length ?
					<>
						<h1 className="center-align">All Countries</h1>
						<Grid container spacing={2} className="all-countries">
							{
								!countries.length ? <>
									<h1 className="center-align">Loading...</h1>
								</> :
									countries.map((country, i) => <Country key={i} country={country} setRecentViewCount={setRecentViewCount} />)
							}

						</Grid>
						<div className="pagination">
							<div>
								<Pagination
									count={totalPages}
									page={page}
									onChange={handlePageChange}
									color="primary"
								/>
							</div>
						</div>
						{recentCountries.length ?
							<>
								<div className="recently-view-header">
									<h2 >Recently Views</h2>
									<Button
										variant="outlined"
										color="error"
										size="small"
										onClick={handleLocalStorageClear}
									>{recentCountries.length > 1 ? "Clear All" : "Clear"}
									</Button>
								</div>

								<Grid container spacing={2} className="all-countries">
									{
										!recentCountries.length ? <>
											<h1 className="center-align">Loading...</h1>
										</> :
											recentCountries.map((country, i) => <Country key={i} country={country} />)
									}
								</Grid>
							</> :
							<div className="recently-view-header">
								<h2>No Recently Views Countries available</h2>
							</div>
						}
					</> :
					<div className="center-align">
						<h1>Loading...</h1>
					</div>
			}
		</div>
	);
};

export default Countries;