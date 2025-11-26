import { httpClient } from "./https";
import { Category } from "../models/category.model";

export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>("/categories");
  return response.data;
};
