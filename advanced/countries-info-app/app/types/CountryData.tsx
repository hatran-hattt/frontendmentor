/**
 * Defines the structure for currency details (like EUR in the example).
 */
export interface CurrencyDetails {
    name: string;
    symbol: string;
}

/**
 * Defines the map of currencies, where keys are the 3-letter currency codes (e.g., "EUR").
 * An index signature is used because the currency codes are dynamic.
 */
export interface Currencies {
    [key: string]: CurrencyDetails;
}

/**
 * Defines the details for a country's native name in a specific language.
 */
export interface NativeNameDetails {
    official: string;
    common: string;
}

/**
 * Defines the map of native names, where keys are the language codes (e.g., "lit").
 * An index signature is used because the language codes are dynamic.
 */
export interface NativeNames {
    [key: string]: NativeNameDetails;
}

/**
 * Defines the full name object structure.
 */
export interface CountryName {
    common: string;
    official: string;
    nativeName: NativeNames;
}

/**
 * Defines the map of languages spoken, where keys are the language codes (e.g., "lit").
 * An index signature is used because the language codes are dynamic.
 */
export interface Languages {
    [key: string]: string; // Key is language code (string), value is language name (string)
}

/**
 * Defines the flags object structure.
 */
export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

/**
 * Defines the full name object structure.
 */
export interface BorderDetail {
    cca3?: string;
    display_name?: string;
}

/**
 * The main interface defining the complete country data object.
 */
export interface CountryData {
    cca3: string; // 3-letter country code
    name: CountryName;
    capital: string[];
    region: string;
    population: number;
    flags: Flags;
    currencies?: Currencies;
    subregion?: string;
    tld?: string[]
    languages?: Languages;
    borders?: string[];
    border_details?: BorderDetail[];
}