import { httpClient } from '@/apis/https';
import { Category } from '@/features/books/types/category.model';

export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>('/categories');
  return response.data;
};
