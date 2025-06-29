import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { IUserFormSchema } from "./interfaces";
import { formConfig } from "./form-schema-config";
import { Check } from "@mui/icons-material";
import axios from "axios";

type FormData = Record<string, string>;
type FormErrors = Record<string, string>;

interface IDynamicUserFormProps {
  user?: FormData;
}

const getInitialData = (initialValues: FormData, user?: FormData) => {
  if (user) {
    return user;
  }
  return initialValues;
};

const DynamicUserForm: React.FC<IDynamicUserFormProps> = (props) => {
  const { user } = props;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
      try {
        if (formData.id) {
          await axios.put(
            `${import.meta.env.VITE_SERVER_URL}users/${formData.id}`,
            formData
          );
        } else {
          await axios.post(`${import.meta.env.VITE_SERVER_URL}users`, formData);
        }
        setSubmitted(true);
      } catch (error) {
        console.error("Error posting user:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData(getInitialData(initialValues, user));
  }, [user]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%" },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        width="100%"
        sx={{ flexDirection: { xs: "column", md: "column" } }}
      >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            gap: 2,
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ columnGap: 1, width: !user || isMobile ? "100%" : "50%" }}
          >
            <div>Submit</div>
            {submitted && <Check />}
            {loading && <CircularProgress size={16} sx={{ color: "white" }} />}
          </Button>
          {!user && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ columnGap: 1, width: "100%" }}
              onClick={() => handleClearForm()}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DynamicUserForm;
