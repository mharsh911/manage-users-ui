import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IBackButtonProps {
  onClick?: () => void;
  text?: string;
}

const BackButton: React.FC<IBackButtonProps> = ({ onClick, text = "Back" }) => {
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={onClick || (() => window.history.back())}
      sx={{
        position: "absolute",
        top: 12,
        left: 16,
        zIndex: 1000,
      }}
    >
      {text}
    </Button>
  );
};

export default BackButton;
