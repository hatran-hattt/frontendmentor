import type { CountryData } from "~/types/CountryData";
import CountryCard from "./CountryCard";
import { cn } from "~/lib/utils";

type SearchResultProps = {
  items: CountryData[];
  className?: string;
}

export default function SearchResult({ items, className}: SearchResultProps) {
  return (
    <div className={cn(
      "grid gap-(--space-xl) justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(265px,1fr))]",
      className
    )}>
      {items.map((item) => (
        <CountryCard key={item.cca3} data={item}/>
      ))}
    </div>
  )
}

// grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
// grid-cols-[repeat(auto-fit, minmax(280px, 1fr))]