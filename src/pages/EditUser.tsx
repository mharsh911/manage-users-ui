import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import DynamicUserForm from "../features/users/components/DynamicUserForm";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import { userService } from "../features/users/user-service";

export const EditUser: FC<{}> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Record<string, string>>({});

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await userService.getUser(userId || "");
      setUser(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        width: 1,
        height: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "16px", fontWeight: 600 }}>Edit User</Box>
      {loading ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : (
        <DynamicUserForm user={user} />
      )}
      <BackButton />
    </Box>
  );
};
