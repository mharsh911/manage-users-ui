import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { TUser, IUserFormSchema } from "../interfaces";
import { formConfig } from "../form-schema-config";
import { Check } from "@mui/icons-material";
import { userService } from "../user-service";
import { toast } from "react-toastify";
import { getValidationErrors } from "../utils";
import { FormInputField } from "./FormInputField";

export type IFormErrors = Record<string, string>;

interface IDynamicUserFormProps {
  user?: TUser;
}

const getInitialData = (initialValues: TUser, user?: TUser) => {
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
  const initialValues = formConfig.reduce<TUser>((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState<TUser>(initialValues);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

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
    const errors: IFormErrors = getValidationErrors(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClearForm = () => {
    setFormData(initialValues);
  };

  const updateUser = async () => {
    try {
      await userService.updateUser(formData.id, formData);
      toast.success("Updated user detail successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error in updating user!");
    }
  };

  const createUser = async () => {
    try {
      await userService.createUser(formData);
      toast.success("Created user successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error in creating user!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !submitted) {
      setLoading(true);
      if (formData.id) {
        await updateUser();
      } else {
        await createUser();
      }
      setSubmitted(true);
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
          return (
            <FormInputField
              field={field}
              value={formData[field.name]}
              formErrors={formErrors}
              onSelectInputChange={handleSelectChange}
              onTextInputChange={handleChange}
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
