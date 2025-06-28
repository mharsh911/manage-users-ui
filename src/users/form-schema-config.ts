import { TextField } from "@mui/material";
import type { IUserFormSchema } from "./interfaces";
import { AutocompleteInput } from "../components/AutocompleteInput";

export const formConfig: IUserFormSchema[] = [
  {
    name: "firstName",
    type: "TextField",
    componet: TextField,
    props: { label: "First name", type: "text", required: true },
    validation: {},
  },
  {
    name: "lastName",
    type: "TextField",
    componet: TextField,
    props: { label: "Last name", type: "text", required: true },
    validation: {},
  },
  {
    name: "email",
    type: "TextField",
    componet: TextField,
    props: { label: "Email address", type: "email", required: true },
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Invalid email address",
    },
  },
  {
    name: "phoneNumber",
    type: "TextField",
    componet: TextField,
    props: { label: "Phone number", type: "number", required: true },
    validation: {
      pattern: /^[0-9]{10}$/,
      errorMessage: "Phone number must be 10 digits",
    },
  },
  {
    name: "address",
    type: "TextField",
    componet: TextField,
    props: { label: "Address", multiline: true, required: true, minRows: 3 },
    validation: {},
  },
  {
    name: "gender",
    componet: AutocompleteInput,
    type: "Autocomplete",
    options: ["Male", "Female", "Others"],
    props: { label: "Gender", required: true },
    validation: {},
  },
];
