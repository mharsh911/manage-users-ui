import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Box } from "@mui/material";

function App() {
  const element = useRoutes(routes);
  return (
    <Box
      sx={{
        px: 8,
        py: 4,
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {element}
    </Box>
  );
}

export default App;
