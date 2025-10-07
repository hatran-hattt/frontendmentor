// Reference: https://reactrouter.com/start/framework/route-module
import { Link, useLoaderData, useNavigate } from "react-router";
import type { CountryData } from "~/types/CountryData";
import { fetchJson } from "~/utils/api-utils";
import type { Route } from "./+types/detail";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CountryDetail from "~/components/detail/CountryDetail";

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  if (!params.cca3) {
    return null
  }
  
  const GET_COUNTRY_DETAIL_API_URL = `https://restcountries.com/v3.1/alpha/${params.cca3}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
  let data: CountryData = await fetchJson({url: GET_COUNTRY_DETAIL_API_URL})

  if (data.borders) {
    const borderDetails = await Promise.all(data.borders?.map(async (borderCca3) => {
      const GET_COUNTRY_NAME_API_URL = `https://restcountries.com/v3.1/alpha/${borderCca3}?fields=name`
      let borderData: CountryData = await fetchJson({url: GET_COUNTRY_NAME_API_URL})
      return {
        cca3: borderCca3,
        display_name: borderData.name.official
      }
    }))
    data.border_details = borderDetails
  }
  
  return data
}

// export function ErrorBoundary() {
//   const error = useRouteError();
//   if (isRouteErrorResponse(error)) {
//     return <ErrorPanel msg={`${error.statusText}(${error.status})`}/>
//   } else if (error instanceof Error) {
//     return <ErrorPanel msg={`${error.message}`}/>
//   } else {
//     return <ErrorPanel/>
//   }
// }

// type LoaderDetail = Awaited<ReturnType<typeof clientLoader>>
export default function Detail() {
  const navigate = useNavigate(); 
  const data = useLoaderData<CountryData>()
  return (
    <>
      
      {data &&
        <div className="px-(--space-m-5xl) grid gap-16 pb-10">
          <Link to=".." relative="path">
            <Button
              type="button"
              variant="ghost"
              className="shadow-sm dark:bg-(--cl-card-bg)"
              onClick={() => navigate(-1)}>
              <ArrowLeft/>Back
            </Button>
          </Link>
          <CountryDetail data={data}/>
        </div>
      }
    </>
    )
}