import { Box } from "@mui/material";
import type { FC } from "react";
import DynamicUserForm from "./DynamicUserForm";
import BackButton from "../components/BackButton";

export const AddUser: FC<{}> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        width: 1,
        height: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "16px", fontWeight: 600 }}>Add New User</Box>
      <DynamicUserForm />
      <BackButton />
    </Box>
  );
};
