export interface User {
  id: number;
  email: string;
  name: string;
  address?: string;
  phone_number?: string | null;
  role: "admin" | "user";
  created_at?: string;
  updated_at?: string;
}

export type BasicUser = Pick<User, "id" | "email" | "name" | "role">;
