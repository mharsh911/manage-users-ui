import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const res = await axios.get("https://your-api.com/users", {
        params: {
          _page: page + 1, // Note: JSON Server is 1-indexed
          _limit: pageSize,
        },
      });

      setUsers(res.data);
      const total = Number(res.headers["x-total-count"] || res.data.length);
      setRowCount(total);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
