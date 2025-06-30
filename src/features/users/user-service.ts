import axios, { type AxiosInstance } from "axios";
import type { IPaginatedResponse, TUser } from "./interfaces";

class UserService {
  private readonly http: AxiosInstance;
  private readonly endpoint = "users";

  constructor() {
    this.http = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });
  }

  async getUsers(
    page: number = 0,
    pageSize: number = 10
  ): Promise<IPaginatedResponse<TUser>> {
    const res = await this.http.get(this.endpoint, {
      params: {
        _page: page + 1, // API is 1-indexed
        _per_page: pageSize,
      },
    });

    const { data, items } = res.data;

    return {
      data,
      items,
    };
  }

  async createUser(user: Record<string, string>): Promise<TUser> {
    const res = await this.http.post(this.endpoint, user);
    return res.data;
  }

  async updateUser(id: string | number, user: TUser): Promise<TUser> {
    const res = await this.http.put(`${this.endpoint}/${id}`, user);
    return res.data;
  }

  async getUser(id: string): Promise<TUser> {
    const res = await this.http.get(`${this.endpoint}/${id}`);
    return res.data;
  }

  async deleteUser(id: string) {
    await this.http.delete(`${this.endpoint}/${id}`);
  }
}

export const userService = new UserService();
