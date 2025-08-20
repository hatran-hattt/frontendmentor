import type { UseFormRegister } from "react-hook-form";
import FormField from "./FormField";
import type { InFormData } from "../../types/form";
import clsx from "clsx";

type TextFieldProps = {
  register: UseFormRegister<InFormData>;
  fieldName: string;
  labelTxt: string;
  errMsg?: string | null;
  className?: string;
  inputElementProps: React.ComponentPropsWithoutRef<'input'>;
};

export default function TextField({
  register,
  fieldName,
  labelTxt,
  errMsg,
  className,
  inputElementProps,
}: TextFieldProps) {
  return (
    <FormField
      labelTxt={labelTxt}
      labelFor={inputElementProps.id}
      errMsg={errMsg}
      renderInput={(inputProps) => (
        <input 
          {...register(fieldName)}
          className={clsx(
            inputProps.className, // Class from FormField's renderInput
            className, // Class from TextField's restInputElementProps
          )}
          {...inputElementProps} // Pass the rest of the props
        />
      )}
    />
  );
}
