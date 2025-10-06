import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useEffect, useRef } from "react"


const regions = [
  { label: "All", value: "All" },
  { label: "Africa", value: "Africa" },
  { label: "Americas", value: "Americas" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "Oceania", value: "Oceania" },
] as const

export const FormSchema = z.object({
  country: z.string().trim().toLowerCase().optional(),
  region: z.enum(["All", "Africa", "Americas", "Asia", "Europe", "Oceania"])

})

type SearchFormProps = {
  handleQueryChange: Function;
  className?: string;
  initCountry?: string;
  initRegion?: string;
}

export function SearchForm(props: SearchFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: props.initCountry ?? "",
      region: FormSchema.shape.region.safeParse(props.initRegion).data
    },
  })

  const watchedCountry = form.watch("country")
  const watchedRegion = form.watch("region")

  const prevCountryRef = useRef<string | undefined>(undefined)
  const prevRegionRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    // console.log(`Prev values: ${prevCountryRef.current} - ${prevRegionRef.current}`)
    // console.log(`Watched values: ${watchedCountry} - ${watchedRegion}`)

    if (prevCountryRef.current !== watchedCountry || prevRegionRef.current !== watchedRegion) {
      const result = FormSchema.safeParse(form.getValues()); // Run the data through Zod to validate
      if (result.success) {
        props.handleQueryChange(result.data)
      }
    }

    prevCountryRef.current = watchedCountry;
    prevRegionRef.current = watchedRegion

  }, [watchedCountry, watchedRegion])

  

  return (
    <Form {...form}>
      <form 
        className={cn("flex flex-col gap-10 sm:flex-row sm:justify-between",
          props.className
        )}
        onSubmit={(e) => {e.preventDefault()}}
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search for a country…" {...field}
                  className="py-6 px-8 shadow-sm rounded-sm sm:min-w-[480px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between py-6 has-[>svg]:px-6 shadow-sm rounded-sm",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? regions.find(
                            (region) => region.value === field.value
                          )?.label
                        : "Filter by Region"}
                      <ChevronDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] p-0">
                  {regions.map((region) => (
                    <DropdownMenuItem
                      key={region.value}
                      onSelect={() => {
                        form.setValue("region", region.value)
                      }}
                    >
                      {region.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          region.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}