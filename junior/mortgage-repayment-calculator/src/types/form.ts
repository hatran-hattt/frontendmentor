import { z } from "zod";

export const INPUT_FIELD_NAME = {
  AMOUNT: 'amount',
  TERM: 'term',
  INTEREST: 'interest',
  TYPE: 'type'
};

export const MORTGAGE_TYPE = {
  REPAYMENT: "repayment",
  INTEREST_ONLY: "interest-only",
};

export const checkRequire = (value: unknown) => {
  if (value === undefined || value === null) {
    return true
  }

  if (typeof value === "string" && value.trim() === "") {
    return true
  }

  return false
}

// const t = z.string().refine((val) => val !== "").tra;

const NumberSchema = z.preprocess((val) => {
  if (val === undefined || val === null || (typeof val === "string" && val.trim() === "")) {
    return null;
  }
  return val;
}, z.coerce
    .number("Please enter number only")
    .positive("Please enter positive number only")
    .nullable()
    // .nullish()
    .refine(val => val !== null, "This field is required"))

export const CaclFormSchema = z.object({
  [INPUT_FIELD_NAME.AMOUNT]: NumberSchema,
  [INPUT_FIELD_NAME.TERM]: NumberSchema,
  [INPUT_FIELD_NAME.INTEREST]: NumberSchema,
  [INPUT_FIELD_NAME.TYPE]: z.enum([MORTGAGE_TYPE.REPAYMENT, MORTGAGE_TYPE.INTEREST_ONLY, ""], {
    error: (iss) => iss.input === undefined || iss.input === "" ? "This field is required" : "Invalid input."
  }),
})

// Infer the TypeScript type directly from the Zod schema
export type FormData = z.infer<typeof CaclFormSchema>;

export const FormDataDefault: FormData = {
  [INPUT_FIELD_NAME.AMOUNT]: "",
  [INPUT_FIELD_NAME.TERM]: "",
  [INPUT_FIELD_NAME.INTEREST]: ""
};