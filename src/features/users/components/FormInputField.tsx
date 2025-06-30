import type { FC } from "react";
import type { IUserFormSchema } from "../interfaces";
import type { IFormErrors } from "./DynamicUserForm";

interface IFormInputField {
  field: IUserFormSchema;
  value: any;
  formErrors: IFormErrors;
  onTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectInputChange: (name: string, value: any) => void;
}

export const FormInputField: FC<IFormInputField> = (props) => {
  const { field, value, formErrors, onTextInputChange, onSelectInputChange } =
    props;
  const Component = field.componet;
  const { type } = field;
  if (type === "Autocomplete") {
    return (
      <Component field={field} value={value} setValue={onSelectInputChange} />
    );
  }
  return (
    <Component
      key={field.name}
      name={field.name}
      value={value}
      onChange={onTextInputChange}
      error={Boolean(formErrors[field.name])}
      helperText={formErrors[field.name]}
      fullWidth
      {...field.props}
    />
  );
};
