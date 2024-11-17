import {
    Button,
    Grid,
    Grid2,
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

    const pageSize = 10;  // Items per page

    useEffect(() => {
        onMount()
    }, [page]);

    useEffect(() => {
        const values = Object.values(localStorage).map(value => JSON.parse(value));
        setRecentCountries(values);
    }, [recentCountries]);

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
        } catch (error) {
            console.log("Exception", error);
        }
    }, [page]);

    const handlePageChange = useCallback((event, value) => {
        // console.log({value});
        setPage(value);
    }, []);

    // console.log({ page, pageSize,length:countries.length });

    return (
        <div className="container ">
            {
                countries.length &&
                <>
                    <h1 className="center-align">All Countries</h1>
                    <Grid container spacing={2} className="all-countries">
                        {
                            !countries.length ? <>
                                <h1 className="center-align">Loading...</h1>
                            </> :
                                countries.map((country, i) => <Country key={i} country={country} />)
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
                                    onClick={() => localStorage.clear()}
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
                </>
            }
        </div>
    );
};

export default Countries;