# Manage Users App

A simple React application to manage user data with basic CRUD (Create, Read, Update, Delete) functionality.

---

## Features

- List users
- Add new users
- Edit existing users
- Delete users

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- npm (comes with Node.js) or yarn
- find the version in .nvmrc

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/manage-users-app.git
cd manage-users-app

npm i
npm run dev
```

### Add this to .env for api url

```
VITE_SERVER_URL=https://json-mock-api-ggav.onrender.com/
```

## 🧩 Adding a New Form Field

This app uses a config-driven form schema (`formConfig`) to define form fields. Adding a new field is easy and doesn't require modifying form logic.

### Step 1: Open the Form Config

Open the file where `formConfig` is defined — typically `form-schema-config.ts`.

### Step 2: Add a New Field Entry

Each form field is defined using the following interface:

```ts
export interface IUserFormSchema {
  name: string;
  type: "TextField" | "Autocomplete";
  componet: ElementType;
  props: TextFieldProps;
  options?: string[] | Record<string, any>[];
  validation: {
    pattern?: RegExp;
    errorMessage?: string;
    minLength?: number;
    maxLength?: number;
  };
}
```

Insert a new object in the formConfig array. For example, to add a username field::

```ts
{
  name: "username",
  type: "TextField",
  componet: TextField,
  props: { label: "Username", type: "text", required: true },
  validation: {
    pattern: /^[a-zA-Z0-9_]{3,20}$/,
    errorMessage: "Username must be 3–20 characters and can only include letters, numbers, and underscores",
  },
}
```

## ⚠️ Important points

1. **name** should be the field name from the user object that will be saved on backend, it is a good practice to keep this camel cased.

2. **props** are mui text field props, so we have complete control over the ui.

3. **options** are mui autocomplete options, only for autocomplete fields.

4. **component** can be any component either mui or custom made. Keep the new component under src/components, and refer it in the config.

That’s it! Your new field will automatically appear in both the Add User and Edit User forms.

## ⚠️ Limitations & Assumptions

1. **Complex validation logic** such as conditional fields (e.g., showing a field only if another field has a certain value) or dependent dropdowns are not supported out of the box. However, the current architecture is flexible enough to be extended to support such use cases.

2. It is **assumed that any new field added** is either a `TextField` or an `Autocomplete`. If you need to add custom inputs like a **date range picker**, you'll need to manually integrate it. For most basic forms, `TextField` and `Autocomplete` should suffice.
