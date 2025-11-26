// src/models/category.model.ts

export interface Category {
  id: number | null;
  parent_id?: number | null;
  name: string;
  created_at?: string;
  updated_at?: string;
}
