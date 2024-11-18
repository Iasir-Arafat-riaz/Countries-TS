import {
	Button,
	Card,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid
} from "@mui/material";
import { TypeCountry } from "../Countries";
import React, { useEffect, useState } from "react";

type TypeProps = {
	country: TypeCountry;
	setRecentViewCount?: (pre: number) => void | undefined;
}

const Country = ({ country, setRecentViewCount }: TypeProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [item, setItem] = useState<TypeCounry[]>([]);
	const [item, setItem] = useState<TypeCountry>({});

	const { area, flags, name, population, unMember } = country;

	useEffect(() => {
		if (item.name !== undefined) {

			localStorage.setItem(`${JSON.stringify(name.common)}`, JSON.stringify(item));
		}
		// localStorage.setItem(`recentItems`, JSON.stringify(item));
		// console.log("testing render");
	}, [item]);
	// console.log({ item });
	return (
		<>
			<Grid item xs={3}>
				<Card>
					<div className="modal-image-div">
						<img src={country.flags.png} alt="" />
					</div>
					<div
						className="country-title"
						onClick={() => {
							setIsOpen(true);
							// setItem([...item, { area, flags, name, population, unMember }])
							setItem({ ...item, area, flags, name, population, unMember });
							setRecentViewCount(pre => pre + 1);
						}}>
						{country.name.common}
					</div>
					<Dialog
						open={isOpen}
						onClose={() => setIsOpen(false)}
					>
						<DialogTitle>Country Details: {country.name.common}</DialogTitle>
						<DialogContent className="country-modal">
							<DialogContentText>
								<div className="country-modal-image-div">
									<img src={country?.flags.png} className="modal-image" />
								</div>
								<div>
									<b>Official Name</b> : {country.name.official}
									<br />
									<b>Un Membership</b> : {country.unMember ? "Yes" : "No"}
									<br />
									<b>Population</b> : {country.population}
									<br />
									<b>Total Area</b> : {country.area} Square km
								</div>
							</DialogContentText>
						</DialogContent>
						<div className="modal-close-button">
							<Button onClick={() => {
								setIsOpen(false)
							}
							}>
								Cancel
							</Button>
							<div className="clearfix"></div>
						</div>
					</Dialog>
				</Card>

			</Grid>
		</>
	);
};

export default React.memo(Country);