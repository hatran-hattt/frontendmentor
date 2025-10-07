import type { CountryData } from "~/types/CountryData";
import InfoLine from "../common/InfoLine";
import { Link } from "react-router";

export default function CountryDetail({data}: {data: CountryData}) {
  const NoDataString = "N/A"
  return (
    <div className="grid md:grid-cols-2 gap-(--space-2xl-3xl) justify-center">
      <img alt={data.flags.alt} className="max-w-[560px] max-h-[400px] w-full object-cover shadow-sm rounded-sm" src={data.flags.svg ?? data.flags.png}/>
      <div className="grid gap-8">
        <h1 className="text-(length:--step-4) font-extrabold">{data.name.official}</h1>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <InfoLine 
              title="Native Name: "
              content={data.name.nativeName
                ? Object.values(data.name.nativeName)
                    .map((native) => native.official)
                    .join(", ")
                : NoDataString}/>
            <InfoLine title="Population: " content={(new Intl.NumberFormat("en-US")).format(data.population)}/>
            <InfoLine title="Region: " content={data.region}/>
            <InfoLine title="Sub Region: " content={data.subregion ?? NoDataString}/>
            <InfoLine title="Capital: " content={data.capital.join(", ")}/>
          </div>
          <div>
            <InfoLine title="Top Level Domain: " content={data.tld?.join(", ") ?? NoDataString}/>
            <InfoLine
              title="Currencies: "
              content={data.currencies
                ? Object.values(data.currencies)
                    .map((currency) => currency.name)
                    .join(", ")
                : NoDataString}/>
            <InfoLine
              title="Languages: "
              content={data.languages
                ? Object.values(data.languages)
                    // .map((language) => language)
                    .join(", ")
                : NoDataString}/>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {(data.border_details && data.border_details?.length) ?
            (
              <>
                <p className="text-(length:--step-0) font-semibold">Border Countries: </p>
                <div className="flex flex-wrap gap-2">
                  {data.border_details?.map((borderDetail) => (
                    <Link to={`/${borderDetail.cca3}`}>
                      <div className="min-w-24 px-2 py-2 rounded-sm shadow-sm
                      dark:bg-(--cl-card-bg) text-(length:--step--1) font-light" key={borderDetail.cca3}>{borderDetail.display_name}</div>
                    </Link>
                  ))}
                </div>
              </>
            )
            :
            (
              <InfoLine title="Border Countries: " content={NoDataString}/>
            )
          }
        </div>          
      </div>
    </div>
  )
}