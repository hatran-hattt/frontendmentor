import { Link } from "react-router";
import { cn } from "~/lib/utils";
import type { CountryData } from "~/types/CountryData";
import InfoLine from "../common/InfoLine";

export default function CountryCard({data}: {data: CountryData}) {
  return (
    <div className={cn(
      "flex flex-col w-full shadow-sm bg-(--cl-card-bg) rounded-sm",
      "cursor-pointer hover:opacity-70"
    )}>
      <Link to={`/${data.cca3}`}>
        <img alt={data.flags.alt} className="h-40 w-full object-cover shadow-sm" src={data.flags.svg ?? data.flags.png}/>
        <div className="flex flex-col p-6 gap-4">
          <h2>{data.name.official}</h2>
          <div className="flex flex-col gap-2">
            <InfoLine title="Population: " content={(new Intl.NumberFormat("en-US")).format(data.population)}/>
            <InfoLine title="Region: " content={data.region}/>
            <InfoLine title="Capital: " content={data.capital.join(", ")}/>
          </div>
        </div>
      </Link>
    </div>
  )
}