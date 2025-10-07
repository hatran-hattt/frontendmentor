import { useLoaderData, useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { FormSchema, SearchForm } from "~/components/home/SearchForm";
import type z from "zod";
import SearchResult from "~/components/home/SearchResult";
import type { CountryData } from "~/types/CountryData";
import { useState } from "react";
import { fetchJson } from "~/utils/api-utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=cca3,name,population,region,capital,flags"
  return await fetchJson({url: COUNTRIES_API_URL})
}

function filterCountries(countries: Array<CountryData>, searchParams: SearchParams) {
  const keywords = searchParams.country?.toLowerCase().split(" ")

  const filteredRlt = countries.filter((country) => {
    const name = country.name.official.toLowerCase()
    if (keywords && !keywords?.every((keyword) => name.includes(keyword))) {
      return false
    }

    if (searchParams.region && searchParams.region !== "All" &&country.region.toLowerCase() !== searchParams.region.toLowerCase()) {
      return false
    }
    
    return true
  })

  return filteredRlt
}

// TIPS: Clean search params
// Utility function to clean an object
interface SearchParamsObject {
  [key: string]: string | undefined | null;
}
interface CleanedSearchParams {
  [key: string]: string;
}
const cleanSearchParams = (
  searchParams: SearchParamsObject
): CleanedSearchParams => {
  const cleaned: CleanedSearchParams = {};
  for (const [key, value] of Object.entries(searchParams)) {
    // Only include values that are not null, undefined, or empty strings
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value;
    }
  }
  return cleaned;
};


interface SearchParams {
  country?: string;
  region?: string | undefined;
}
export default function Home() {

  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams.entries())
  const countries = useLoaderData<Array<CountryData>>()
  const [filteredCountries, setFilteredCountries] = useState<Array<CountryData>>(filterCountries(countries, searchParamsObj))
  
  console.log("Home before render: " + searchParams.toString() + " - " + countries.length + " - " + filteredCountries.length)
  console.log("---: " + searchParamsObj.country + " - " + searchParamsObj.region)

  const handleQueryChange = (formData: z.infer<typeof FormSchema>) => {
    const filteredRlt = filterCountries(countries, formData)
    setFilteredCountries(filteredRlt)
    setSearchParams(cleanSearchParams(formData), {replace: true}) // TIPS: Clean search params (remove params whose value is null/undefined)
  }

  return (
    <>
      <SearchForm className="px-(--space-s-l)"
        handleQueryChange={handleQueryChange}
        initCountry={searchParamsObj.country}
        initRegion={searchParamsObj.region}
        />
      <SearchResult items={filteredCountries} className="py-(--space-l-2xl) px-(--space-2xl-5xl)" />
    </>
  )
}
