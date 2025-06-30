import type { TUser } from "../interfaces";
import { getValidationErrors } from "../utils";
import { vi, describe, it, expect } from "vitest";

vi.mock("../form-schema-config", () => ({
  formConfig: [
    {
      name: "firstName",
      props: { label: "First Name", required: true },
      validation: { minLength: 2, maxLength: 10 },
    },
    {
      name: "email",
      props: { label: "Email", required: true },
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email address",
      },
    },
  ],
}));

describe("getValidationErrors", () => {
  it("returns errors for empty required fields", () => {
    const formData: TUser = {
      firstName: "",
      email: "",
    };

    const errors = getValidationErrors(formData);
    expect(errors).toEqual({
      firstName: "First Name is required",
      email: "Email is required",
    });
  });

  it("returns error for invalid email", () => {
    const formData: TUser = {
      firstName: "John",
      email: "invalid-email",
    };

    const errors = getValidationErrors(formData);
    expect(errors).toEqual({
      email: "Invalid email address",
    });
  });

  it("returns error for min/max length violations", () => {
    const formData: TUser = {
      firstName: "A",
      email: "a@b.com",
    };

    const errors = getValidationErrors(formData);
    expect(errors).toEqual({
      firstName: "First Name must be at least 2 characters",
    });
  });

  it("returns no errors for valid data", () => {
    const formData: TUser = {
      firstName: "Alice",
      email: "alice@example.com",
    };

    const errors = getValidationErrors(formData);
    expect(errors).toEqual({});
  });
});
