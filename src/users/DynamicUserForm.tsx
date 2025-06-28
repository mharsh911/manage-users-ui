import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import type { IUserFormSchema } from "./interfaces";
import { formConfig } from "./form-schema-config";
import { Check } from "@mui/icons-material";
import axios from "axios";

type FormData = Record<string, string>;
type FormErrors = Record<string, string>;

const DynamicUserForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = formConfig.reduce<FormData>((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const validate = () => {
    const errors: FormErrors = {};

    formConfig.forEach((field) => {
      const value = formData[field.name];
      if (field.props.required && !value) {
        errors[field.name] = `${field.props.label} is required`;
      } else if (
        field.validation?.pattern &&
        !field.validation.pattern.test(value)
      ) {
        errors[field.name] = field.validation.errorMessage || "Invalid input";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClearForm = () => {
    setFormData(initialValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !submitted) {
      setLoading(true);
      console.log("Form Submitted:", formData);

      try {
        const response = await axios.post(
          "http://localhost:3000/users",
          formData
        );
        console.log("User created:", response.data);
        setSubmitted(true);
      } catch (error) {
        console.error("Error posting user:", error);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "50%" }}>
      <Box display="flex" flexDirection="column" gap={3} width="100%">
        {formConfig.map((field: IUserFormSchema) => {
          const Component = field.componet;
          const { type } = field;
          if (type === "Autocomplete") {
            return (
              <Component
                field={field}
                value={formData[field.name]}
                setValue={handleSelectChange}
              />
            );
          }
          return (
            <Component
              key={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              error={Boolean(formErrors[field.name])}
              helperText={formErrors[field.name]}
              fullWidth
              {...field.props}
            />
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "20%", minWidth: "200px", columnGap: 1 }}
          >
            <div>Submit</div>
            {submitted && <Check />}
            {loading && <CircularProgress size={16} sx={{ color: "white" }} />}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "20%", minWidth: "200px", columnGap: 1 }}
            onClick={() => handleClearForm()}
          >
            Clear
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default DynamicUserForm;
