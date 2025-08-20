import { z } from "zod";

export const INPUT_FIELD_NAME = {
  BILL: 'bill',
  TIP: 'tip-percentage',
  TIP_CUSTOM: 'tip-custom-value',
  NUM_OF_PEOPLE: 'num-of-people'
};

const NumberSchema = z.union([z.literal("").transform(() => null), z.coerce.number("Only enter number").nullable()]);

const PositiveNumberSchema = NumberSchema.refine((val) => val === null || val > 0, {
  message: "Can't be negative or zero",
});
const ZeroAndPositiveNumberSchema = NumberSchema.refine((val) => val === null || val >= 0, {
  message: "Can't be negative",
});
const WholePositiveNumberSchema = PositiveNumberSchema.refine((val) => val === null || Number.isInteger(val), {
  message: "Only enter whole number",
});

export const CaclFormSchema = z.object({
  [INPUT_FIELD_NAME.BILL]: PositiveNumberSchema,
  [INPUT_FIELD_NAME.TIP]: ZeroAndPositiveNumberSchema,
  [INPUT_FIELD_NAME.TIP_CUSTOM]: ZeroAndPositiveNumberSchema,
  [INPUT_FIELD_NAME.NUM_OF_PEOPLE]: WholePositiveNumberSchema});

export type InFormData = z.input<typeof CaclFormSchema>;

// Infer the TypeScript type directly from the Zod schema
export type OutFormData = z.infer<typeof CaclFormSchema>;

export const FormInputDefault: OutFormData = {
  [INPUT_FIELD_NAME.BILL]: null,
  [INPUT_FIELD_NAME.TIP]: null,
  [INPUT_FIELD_NAME.TIP_CUSTOM]: null,
  [INPUT_FIELD_NAME.NUM_OF_PEOPLE]: null,
};