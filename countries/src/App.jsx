import React, { useState, useEffect } from 'react';
import axios from "axios"

const App = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [countryInfo, setCountryInfo] = useState({})
	const [countryToShow, setCountryToShow] = useState(null);

	const handleInputChange = (event) => {
		setCountry(event.target.value);
	};

	const handleClick = (country) => {
		if (countryToShow === country) {
			// If the clicked country is already being shown, hide it
			setCountryToShow(null);
		} else {
			// Otherwise, show the clicked country's details
			setCountryToShow(country);
			axios
				.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`)
				.then(response => setCountryInfo(response.data))	
		}		
	}

	/*fetch all countries info */
	useEffect(() => {
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then(response => setCountries(response.data))
			.catch(error => console.error("Error fetching countries:", error));
	}, []);

	/*get countries includes input strings */
	useEffect(() => {
		if (country) {
			const filtered = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()));
			setFilteredCountries(filtered);
		} else {
			setFilteredCountries([]);
		}
	}, [country]);

	return (
		<>
			<p>Find Countries <input value={country} onChange={handleInputChange} /></p>
			{filteredCountries.length > 10 ? 
				<p> Too Many Matches, specify another filter</p>
				: filteredCountries.length > 0 ?
				filteredCountries.map(country => (
					<div key={country.name.common}>
						<p >{country.name.common} 
							<button onClick={() => handleClick(country)}>Show</button>
						</p>
						{countryToShow === country && (
							<>
								<h1>{countryInfo?.name?.common}</h1>
								<p>Capital : {countryInfo?.capital}</p>
								<p>Area : {countryInfo?.area}</p>
								<h3>Languages:</h3>
								<ul>
									{Object.values(countryInfo?.languages || {}).map(lang => <li key={lang}>{lang}</li>)}
								</ul>
								<img src={countryInfo?.flags?.png} />
							</>			
							)
						}
					</div>			
				))
				: null
			}
		</>
	);
};

export default App;
