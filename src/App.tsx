import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Box } from "@mui/material";

function App() {
  const element = useRoutes(routes);
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4 },
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {element}
    </Box>
  );
}

export default App;
