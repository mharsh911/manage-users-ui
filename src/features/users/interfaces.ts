import type { TextFieldProps } from "@mui/material";
import type { ElementType } from "react";

type TInputTypes = "TextField" | "Autocomplete";

export interface IUserFormSchema {
  name: string;
  type: TInputTypes;
  componet: ElementType;
  props: TextFieldProps;
  options?: string[] | Record<string, any>[];
  validation: Record<string, any>;
}

export type TUser = Record<string, any>;

export interface IPaginatedResponse<T> {
  data: T[];
  items: number;
}
