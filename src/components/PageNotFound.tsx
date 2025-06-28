import { Box } from "@mui/material";
import type { FC } from "react";

export const PageNotFound: FC<{}> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      404 Not Found
    </Box>
  );
};
