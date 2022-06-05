import { createStore, createEvent, createEffect, combine } from 'effector';
import { ICountry } from './../types';
import { shuffle } from 'lodash';


export const __INIT__ = createEffect(async () => {

	let response: Response = await fetch('https://restcountries.com/v3.1/all'),
		result = await response.json();

	// construct correct data from result
	const countriesFromResult: Array<ICountry> = [];
	for(let item in result){
		countriesFromResult.push({
			area: result[item].area,
			borderCountries: result[item].borders,
			capital: result[item].capital ? result[item].capital[0] : '',
			independent: result[item].independent,
			name: result[item].name.official,
			population: result[item].population,
			region: result[item].region,
			flagIcon: result[item].flags.svg,
			index: item
		})
	}

	return [...countriesFromResult];
})
export const $countries = createStore<Arrray<ICountry>>([]);

$countries.on(__INIT__.done, (_, payload) => payload.result);
