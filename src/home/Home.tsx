import { Box, Button } from "@mui/material";
import type { FC } from "react";
import UserList from "./ListUsers";
import { useNavigate } from "react-router-dom";

export const Home: FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: 600 }}>Manage Users</div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/add-user")}
          >
            Add new user
          </Button>
        </div>
      </div>
      <UserList />
    </Box>
  );
};
