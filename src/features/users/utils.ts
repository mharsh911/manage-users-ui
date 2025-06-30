import type { FormErrors } from "./components/DynamicUserForm";
import { formConfig } from "./form-schema-config";
import type { TUser } from "./interfaces";

export const getValidationErrors = (formData: TUser) => {
  const errors: FormErrors = {};

  formConfig.forEach((field) => {
    const value = formData[field.name] ?? "";
    const label = field.props.label;
    const { required } = field.props;
    const { pattern, errorMessage, minLength, maxLength } =
      field.validation || {};

    // Required check
    if (required && !value.toString().trim()) {
      errors[field.name] = `${label} is required`;
      return;
    }

    // Pattern check (e.g., email, phone)
    if (pattern && !pattern.test(value)) {
      errors[field.name] = errorMessage || `${label} is invalid`;
      return;
    }

    // Min length check
    if (minLength && value.length < minLength) {
      errors[field.name] = `${label} must be at least ${minLength} characters`;
      return;
    }

    // Max length check
    if (maxLength && value.length > maxLength) {
      errors[field.name] = `${label} must be at most ${maxLength} characters`;
      return;
    }
  });

  return errors;
};
