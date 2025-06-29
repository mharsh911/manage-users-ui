import { Autocomplete, TextField } from "@mui/material";
import type { IUserFormSchema } from "../features/users/interfaces";
import type { FC } from "react";

interface IAutocompleteInputProps {
  field: IUserFormSchema;
  value: any;
  setValue: (name: string, value: any) => void;
}

export const AutocompleteInput: FC<IAutocompleteInputProps> = ({
  field,
  value,
  setValue,
}) => (
  <Autocomplete
    options={field.options || []}
    value={value || ""}
    onChange={(_, newVal) => setValue(field.name, newVal)}
    renderInput={(params) => (
      <TextField {...params} label={field.props.label} {...field.props} />
    )}
  />
);
